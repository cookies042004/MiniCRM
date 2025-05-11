import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const RuleBuilder = ({ onRulesChange, rules: incomingRules = [] }) => {
  const [rules, setRules] = useState(incomingRules);

  useEffect(() => {
    setRules(incomingRules);
  }, [incomingRules]);

  const handleChange = (index, key, value) => {
    const updatedRules = [...rules];
    updatedRules[index][key] = value;
    setRules(updatedRules);
    onRulesChange(updatedRules);
  };

  const addRule = () => {
    const newRules = [...rules, { field: "visits", operator: "<", value: "" }];
    setRules(newRules);
    onRulesChange(newRules);
  };

  const deleteRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
    onRulesChange(updatedRules);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Segment Rules</h3>

      {rules.map((rule, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-center gap-3 border border-gray-200 rounded-lg p-4 bg-gray-50 relative"
        >
          <select
            value={rule.field}
            onChange={(e) => handleChange(index, "field", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="totalSpend">Total Spend</option>
            <option value="visits">Visits</option>
            <option value="lastActiveDate">Inactive Days</option>
          </select>

          <select
            value={rule.operator}
            onChange={(e) => handleChange(index, "operator", e.target.value)}
            className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="=">=</option>
          </select>

          <input
            type="text"
            value={rule.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            placeholder="Value"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={() => deleteRule(index)}
            className="text-red-500 hover:text-red-600 text-2xl font-medium mt-2 sm:mt-0 sm:ml-4 hover:cursor-pointer"
          >
            <MdDelete />
          </button>
        </div>
      ))}

      <button
        onClick={addRule}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium transition hover:cursor-pointer"
      >
        Add Rule
      </button>
    </div>
  );
};

export default RuleBuilder;
