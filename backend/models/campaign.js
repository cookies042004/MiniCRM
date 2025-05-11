const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  rules: Array,
  audienceSize: Number,
  messages: [
    {
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      message: String,
      status: String,
      timestamp: Date
    }
  ]
});

module.exports = mongoose.model('Campaign', CampaignSchema);
