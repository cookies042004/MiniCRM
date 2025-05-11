const express = require("express");
const router = express.Router();
const { generateRulesFromPrompt } = require("../controllers/aiController");

router.post("/rules", generateRulesFromPrompt);

module.exports = router;
