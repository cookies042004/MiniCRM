import React, { useState } from 'react';
import RuleBuilder from '../components/RuleBuilder';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CampaignBuilder = () => {
  const [rules, setRules] = useState([]);
  const [audienceSize, setAudienceSize] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePreview = async () => {
    try {
      const response = await axios.post('/campaign/preview', { rules });
      setAudienceSize(response.data.count);
    } catch (err) {
      alert("Failed to preview audience.");
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('/campaign/save', { rules });
      alert('Campaign saved and delivery started!');
      navigate('/history');
    } catch (err) {
      alert("Failed to save campaign.");
      console.error(err);
    }
  };

  const handleGenerateRules = async () => {
    if (!aiPrompt.trim()) return;
    try {
      setLoading(true);
      const response = await axios.post('/ai/rules', { prompt: aiPrompt });
      setRules(response.data.rules);
    } catch (err) {
      alert("AI failed to generate rules.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Campaign
      </h2>

      {/* AI Rule Prompt */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          AI Rule Prompt
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. customers who spent over 3000 and inactive for 60 days"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleGenerateRules}
            disabled={loading}
            className={`px-5 py-3 rounded-lg text-white font-medium ${
              loading ? 'bg-purple-400' : 'bg-purple-500 hover:bg-purple-600 hover:cursor-pointer'
            }`}
          >
            {loading ? 'Generating...' : 'Generate Rules'}
          </button>
        </div>
      </div>

      {/* Rule Builder */}
      <div className="mb-8">
        <RuleBuilder onRulesChange={setRules} rules={rules} />
      </div>

      {/* Preview & Save */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-4">
          <button
            onClick={handlePreview}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:cursor-pointer"
          >
            Preview Audience
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-medium hover:cursor-pointer"
          >
            Save Campaign
          </button>
        </div>
        {audienceSize !== null && (
          <span className="text-lg text-gray-700 font-semibold">
            Audience Size: {audienceSize}
          </span>
        )}
      </div>
    </div>
  );
};

export default CampaignBuilder;
