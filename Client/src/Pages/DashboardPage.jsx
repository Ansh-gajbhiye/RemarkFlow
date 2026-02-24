import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  { id: 1, name: 'Rahul Sharma', role: 'Maker', status: 'online' },
  { id: 2, name: 'Priya Patel', role: 'Maker', status: 'idle' },
  { id: 3, name: 'Amit Verma', role: 'Checker', status: 'offline' },
  { id: 4, name: 'Neha Gupta', role: 'Maker', status: 'online' },
];

const documentTypes = [
  "Bank Statement", "Company Profile", "Employment Profile",
  "Form 26 AS", "ID Card", "Income Documents", "ITR",
  "ITR and Financial", "Office Profile", "Residence Existence",
  "Salary Certificate", "Salary Slip", "School Letter"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [sentiment, setSentiment] = useState('positive');
  const firstDocRef = useRef(null);

  useEffect(() => {
    if (firstDocRef.current) firstDocRef.current.focus();
  }, []);

  useEffect(() => {
    const handleGlobalKeys = (e) => {
      if (e.key === 'Enter' && selectedDocs.length > 0) handleStartReport();
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [selectedDocs, sentiment]);

  const toggleDocument = (doc) => {
    setSelectedDocs(prev =>
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    );
  };

  const handleStartReport = () => {
    if (selectedDocs.length === 0) return;
    navigate('/form', { state: { selectedDocs, sentiment } });
  };

  const handleCardKeyDown = (e, doc) => {
    if (e.key === ' ') {
      e.preventDefault();
      toggleDocument(doc);
    }
  };

  // Status indicator colors
  const statusColor = {
    online: 'bg-green-500',
    idle: 'bg-yellow-400',
    offline: 'bg-gray-300'
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar – Team Activity */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Team Activity
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className={`w-2.5 h-2.5 rounded-full mr-3 ${statusColor[member.status]}`} />
              <div>
                <p className="text-sm font-medium text-gray-700">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
          <span>{teamMembers.filter(m => m.status === 'online').length} online</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with title and selected count */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Start New Case</h1>
              <p className="text-sm text-gray-500 mt-1">
                Use <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Tab</kbd> to navigate,{' '}
                <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Space</kbd> to select
              </p>
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium">
              {selectedDocs.length} selected
            </div>
          </div>

          {/* Document Type Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {documentTypes.map((doc, index) => {
              const isSelected = selectedDocs.includes(doc);
              return (
                <div
                  key={doc}
                  ref={index === 0 ? firstDocRef : null}
                  tabIndex={0}
                  onClick={() => toggleDocument(doc)}
                  onKeyDown={(e) => handleCardKeyDown(e, doc)}
                  className={`
                    flex items-center p-3 rounded-lg border-2 cursor-pointer
                    transition-all duration-150 outline-none
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    ${isSelected 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 bg-white hover:border-indigo-200'
                    }
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded border flex items-center justify-center mr-3
                    ${isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'border-gray-300 bg-white'
                    }
                  `}>
                    {isSelected && (
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12">
                        <path d="M10.28 2.28L4 8.56 1.72 6.28a1 1 0 00-1.41 1.41l3 3a1 1 0 001.41 0l7-7a1 1 0 00-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{doc}</span>
                </div>
              );
            })}
          </div>

          {/* Sentiment / Outcome Selection */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Case outcome</p>
            <div className="flex flex-wrap gap-6">
              {['positive', 'negative', 'risk'].map(value => (
                <label key={value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sentiment"
                    value={value}
                    checked={sentiment === value}
                    onChange={(e) => setSentiment(e.target.value)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartReport}
            disabled={selectedDocs.length === 0}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-base transition-colors
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              ${selectedDocs.length > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Start Filling Report {selectedDocs.length > 0 && '↵'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;