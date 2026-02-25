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

  const handleDocsClick = () => {
    navigate('/docs');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Status indicator colors
  const statusColor = {
    online: 'bg-green-500',
    idle: 'bg-yellow-400',
    offline: 'bg-gray-300'
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Enhanced Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between shadow-sm">
        {/* Left side: Logo and main navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold text-indigo-700">RemarksFlow</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">beta</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/reports')}
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
            >
              Reports
            </button>
            <button
              onClick={() => handleNavigation('/templates')}
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
            >
              Templates
            </button>
            <button
              onClick={() => handleNavigation('/admin')}
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Right side: Docs and user profile */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDocsClick}
            className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Docs</span>
          </button>
          <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">Ansh </div>
              <div className="text-xs text-gray-500">Maker</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold">
              AG
            </div>
          </div>
        </div>
      </nav>

      {/* Main content row (sidebar + main) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar – Team Activity (unchanged) */}
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

        {/* Main Content (unchanged) */}
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
    </div>
  );
};

export default Dashboard;