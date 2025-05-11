const Customer = require('../models/Customer');
const Campaign = require('../models/Campaign');
const { convertRulesToQuery } = require('../utils/ruleParser');

exports.getAllCampaigns = async (req, res) => {
    try {
      const campaigns = await Campaign.find().sort({ createdAt: -1 });
      res.json(campaigns);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.previewAudience = async (req, res) => {
  try {
    const rules = req.body.rules;
    const query = convertRulesToQuery(rules);
    const count = await Customer.countDocuments(query);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveCampaign = async (req, res) => {
  try {
    const rules = req.body.rules;
    const query = convertRulesToQuery(rules);
    const customers = await Customer.find(query);

    const messages = customers.map(customer => ({
      customerId: customer._id,
      message: `Hi ${customer.name}, here’s 10% off on your next order!`,
      status: "PENDING",
      timestamp: new Date()
    }));

    const campaign = new Campaign({
      rules,
      audienceSize: customers.length,
      messages
    });

    await campaign.save();

    for (const m of campaign.messages) {
      await fetch("http://localhost:4000/api/vendor/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: m.customerId,
          message: m.message,
          callbackUrl: `http://localhost:4000/api/campaign/receipt/${campaign._id}`
        })
      });
    }

    res.status(201).json({ message: "Campaign saved and delivery started." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deliveryReceipt = async (req, res) => {
  try {
    const { customerId, status } = req.body;
    const campaignId = req.params.id;

    const campaign = await Campaign.findById(campaignId);
    for (let msg of campaign.messages) {
      if (msg.customerId.toString() === customerId) {
        msg.status = status;
        msg.timestamp = new Date();
        break;
      }
    }

    await campaign.save();
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
