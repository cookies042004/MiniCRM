exports.convertRulesToQuery = (rules) => {
  const query = [];

  rules.forEach((rule) => {
    const { field, operator, value } = rule;
    if (!field || !operator || value === "") return;

    if (field === "lastActiveDate") {
      const date = new Date();
      date.setDate(date.getDate() - parseInt(value));
      query.push({ lastActiveDate: { $lt: date } });
    } else {
      const num = parseFloat(value);
      if (operator === ">") query.push({ [field]: { $gt: num } });
      if (operator === "<") query.push({ [field]: { $lt: num } });
      if (operator === "=") query.push({ [field]: num });
    }
  });

  return { $and: query };
};
