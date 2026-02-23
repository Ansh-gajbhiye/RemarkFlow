import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  { id: 1, name: 'Rahul Sharma', role: 'Maker', status: 'online' },
  { id: 2, name: 'Priya Patel', role: 'Maker', status: 'idle' },
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
  
  // Ref to focus the first element automatically
  const firstDocRef = useRef(null);

  // 1. AUTO-FOCUS: When page loads, focus the first document card immediately
  useEffect(() => {
    if (firstDocRef.current) {
      firstDocRef.current.focus();
    }
  }, []);

  // 2. GLOBAL HOTKEYS: Listen for "Enter" to submit
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      // If user presses Enter AND has selected docs, go to next page
      if (e.key === 'Enter' && selectedDocs.length > 0) {
        handleStartReport();
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [selectedDocs, sentiment]); // Re-bind listener if state changes

  const toggleDocument = (docName) => {
    if (selectedDocs.includes(docName)) {
      setSelectedDocs(selectedDocs.filter(d => d !== docName));
    } else {
      setSelectedDocs([...selectedDocs, docName]);
    }
  };

  const handleStartReport = () => {
    if (selectedDocs.length === 0) return;
    navigate('/form', { state: { selectedDocs, sentiment } });
  };

  // 3. KEYBOARD SELECTION LOGIC
  const handleCardKeyDown = (e, doc) => {
    // If user presses Space, toggle the card
    if (e.key === ' ') {
      e.preventDefault(); // Stop page from scrolling down
      toggleDocument(doc);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar hidden for brevity */}
      {/* --- Left Sidebar (Team) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Team Activity</h2>
        </div>
        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {teamMembers.map((member) => (
            <li key={member.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default">
              <span
                className={`w-2.5 h-2.5 rounded-full mr-3 ${
                  member.status === 'online' ? 'bg-green-500' : 
                  member.status === 'idle' ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              />
              <div>
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          
          <div className="mb-6 flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Start New Case</h1>
              <p className="text-sm text-gray-500">Use <kbd className="bg-gray-100 px-1 rounded">Tab</kbd> to move and <kbd className="bg-gray-100 px-1 rounded">Space</kbd> to select.</p>
            </div>
            <div className="text-right">
               <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                {selectedDocs.length} Selected
              </span>
            </div>
          </div>

          {/* KEYBOARD FRIENDLY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 max-h-96 overflow-y-auto p-2">
            {documentTypes.map((doc, index) => {
              const isSelected = selectedDocs.includes(doc);
              return (
                <div
                  key={doc}
                  // Attach ref to the first item only
                  ref={index === 0 ? firstDocRef : null}
                  // Make it focusable
                  tabIndex={0}
                  // Handle Spacebar
                  onKeyDown={(e) => handleCardKeyDown(e, doc)}
                  // Handle Mouse Click
                  onClick={() => toggleDocument(doc)}
                  // Styles: Add a 'focus:ring' so you can see where you are!
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-105' 
                      : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${
                    isSelected ? 'bg-white border-white' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-indigo-600 rounded-sm" />}
                  </div>
                  <span className="text-sm font-bold">{doc}</span>
                </div>
              );
            })}
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
             <p className="text-xs font-bold uppercase text-gray-400 mb-2">Outcome (Arrow Keys to Select)</p>
             <div className="flex gap-6">
               {['positive', 'negative', 'risk'].map((s) => (
                 <label key={s} className="flex items-center cursor-pointer">
                   <input 
                     type="radio" 
                     name="sentiment" 
                     value={s} 
                     checked={sentiment === s}
                     onChange={(e) => setSentiment(e.target.value)}
                     className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" 
                   />
                   <span className="ml-2 capitalize font-medium">{s}</span>
                 </label>
               ))}
             </div>
          </div>

          <button
            onClick={handleStartReport}
            className={`w-full py-4 rounded-xl font-bold transition-all ${
              selectedDocs.length > 0 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
            }`}
          >
            Start Filling Report (Press Enter ↵)
          </button>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;