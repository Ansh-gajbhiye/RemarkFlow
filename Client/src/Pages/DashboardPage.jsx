import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock team members data
const teamMembers = [
  { id: 1, name: 'Rahul Sharma', role: 'Maker', status: 'online' },
  { id: 2, name: 'Priya Patel', role: 'Maker', status: 'idle' },
  { id: 3, name: 'Amit Verma', role: 'Checker', status: 'online' },
  { id: 4, name: 'Neha Gupta', role: 'Maker', status: 'offline' },
  { id: 5, name: 'Vikram Singh', role: 'Checker', status: 'online' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [docType, setDocType] = useState('salary');
  const [sentiment, setSentiment] = useState('positive');

  const handleStartReport = () => {
    // Navigate to form input page, passing selected options via state
    navigate('/form', { state: { documentType: docType, sentiment } });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar – Team Members */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
        </div>
        <ul className="flex-1 overflow-y-auto p-2">
          {teamMembers.map((member) => (
            <li key={member.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
              <span
                className={`w-2 h-2 rounded-full mr-3 ${
                  member.status === 'online'
                    ? 'bg-green-500'
                    : member.status === 'idle'
                    ? 'bg-yellow-500'
                    : 'bg-gray-400'
                }`}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Main Area */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Generate New Report</h1>

          {/* Document Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Document Type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="salary">Salary Slip</option>
              <option value="bank">Bank Statement</option>
              <option value="itr">ITR</option>
              <option value="financial">Financial Documents</option>
            </select>
          </div>

          {/* Sentiment Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remark Sentiment
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sentiment"
                  value="positive"
                  checked={sentiment === 'positive'}
                  onChange={(e) => setSentiment(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Positive</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sentiment"
                  value="negative"
                  checked={sentiment === 'negative'}
                  onChange={(e) => setSentiment(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Negative</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sentiment"
                  value="risk"
                  checked={sentiment === 'risk'}
                  onChange={(e) => setSentiment(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-gray-700">Risk Alert (RAD)</span>
              </label>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartReport}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Filling Report
          </button>

          {/* Optional: Recent reports or quick info can go here */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;