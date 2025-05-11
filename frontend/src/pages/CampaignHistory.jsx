import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('/campaign/all');
        setCampaigns(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch campaign history');
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Campaign History
      </h1>

      {campaigns.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No campaigns found.
        </div>
      ) : (
        <div className="space-y-6">
          {campaigns.map((c, i) => {
            const sent = c.messages.filter((m) => m.status === 'SENT').length;
            const failed = c.messages.filter((m) => m.status === 'FAILED').length;

            return (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <p className="text-sm text-gray-500">
                    Created on:{' '}
                    <span className="font-medium text-gray-800">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                    Audience Size:{' '}
                    <span className="font-medium text-gray-800">
                      {c.audienceSize}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm font-medium">
                  <div className="text-green-600">Delivered: {sent}</div>
                  <div className="text-red-500">Failed: {failed}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampaignHistory;
