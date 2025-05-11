exports.generateRulesFromPrompt = async (req, res) => {
  const { prompt } = req.body;
  const rules = [];

  if (prompt.includes("spent") || prompt.includes("spend")) {
    const match = prompt.match(/spent.*?(\d+)/);
    if (match) {
      rules.push({ field: "totalSpend", operator: ">", value: match[1] });
    }
  }

  if (prompt.includes("visit")) {
    const match = prompt.match(/visit.*?(\d+)/);
    if (match) {
      rules.push({ field: "visits", operator: "<", value: match[1] });
    }
  }

  if (prompt.includes("inactive") || prompt.includes("days")) {
    const match = prompt.match(/(\d+)\s*days/);
    if (match) {
      rules.push({ field: "lastActiveDate", operator: "<", value: match[1] });
    }
  }

  if (rules.length === 0) {
    rules.push({ field: "visits", operator: "<", value: "3" });
  }

  res.json({ rules });
};
