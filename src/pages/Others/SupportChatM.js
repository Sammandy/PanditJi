import React, { useState } from 'react';

const SupportChantM = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="p-6 bg-teal-50 h-full">
      <h2 className="text-3xl font-semibold mb-6 text-black">Support and Management</h2>
      <div className="flex space-x-6 mb-6">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-lg text-lg ${
            activeTab === 'chat' ? 'bg-teal-600 text-white' : 'bg-teal-300 text-black'
          }`}
        >
          Live Chat Support
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 rounded-lg text-lg ${
            activeTab === 'tickets' ? 'bg-teal-600 text-white' : 'bg-teal-300 text-black'
          }`}
        >
          Support Tickets
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-lg text-lg ${
            activeTab === 'reports' ? 'bg-teal-600 text-white' : 'bg-teal-300 text-black'
          }`}
        >
          Payment & Revenue Reports
        </button>
      </div>

      {activeTab === 'chat' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-medium mb-4 text-teal-600">Live Chat Support</h3>
          <p className="text-lg text-black">Connect with users and priests through live chat.</p>
          <div className="mt-4 border-t pt-4">
            <div className="h-64 border border-teal-300 rounded-lg p-4 overflow-auto bg-teal-50">
              <p className="text-black">Chat messages will appear here...</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-medium mb-4 text-teal-600">Support Tickets</h3>
          <p className="text-lg text-black">View and resolve open support tickets.</p>
          <div className="mt-4 border-t pt-4">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left text-teal-600">Ticket ID</th>
                  <th className="border-b p-2 text-left text-teal-600">Status</th>
                  <th className="border-b p-2 text-left text-teal-600">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b p-2 text-black">#001</td>
                  <td className="border-b p-2 text-black">Pending</td>
                  <td className="border-b p-2">
                    <button className="text-teal-600 hover:underline">Resolve</button>
                  </td>
                </tr>
                <tr>
                  <td className="border-b p-2 text-black">#002</td>
                  <td className="border-b p-2 text-black">Resolved</td>
                  <td className="border-b p-2">
                    <button className="text-gray-400" disabled>
                      Resolved
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-medium mb-4 text-teal-600">Payment & Revenue Reports</h3>
          <p className="text-lg text-black">Generate and view payment and revenue reports.</p>
          <div className="mt-4 border-t pt-4">
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
              Generate Report
            </button>
            <div className="mt-4 border-t pt-4 bg-teal-50 p-4 rounded-lg">
              <p className="text-black">Reports will be displayed here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChantM;
