const express = require('express');
const router = express.Router();
const { previewAudience, saveCampaign, deliveryReceipt, getAllCampaigns } = require('../controllers/campaignController');

router.get('/all', getAllCampaigns);
router.post('/preview', previewAudience);
router.post('/save', saveCampaign);
router.post('/receipt/:id', deliveryReceipt);

module.exports = router;
