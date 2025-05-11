const express = require('express');
const router = express.Router();

router.post('/send', async (req, res) => {
  const { customerId, message, callbackUrl } = req.body;

  setTimeout(async () => {
    const status = Math.random() < 0.9 ? "SENT" : "FAILED";

    await fetch(callbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, status })
    });
  }, 1000);

  res.json({ message: "Vendor simulated delivery" });
});

module.exports = router;
