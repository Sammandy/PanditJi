import React, { useState } from 'react';

function ManageOnlinePuja() {
  const [pujaRequests, setPujaRequests] = useState([
    { id: 1, customerName: 'John Doe', date: '2024-12-28', status: 'Pending', priest: null, sessionTime: null, meetingLink: '' },
    { id: 2, customerName: 'Jane Smith', date: '2024-12-29', status: 'Pending', priest: null, sessionTime: null, meetingLink: '' },
    { id: 3, customerName: 'Mary Johnson', date: '2024-12-30', status: 'Pending', priest: null, sessionTime: null, meetingLink: '' },
    { id: 4, customerName: 'James Brown', date: '2024-12-31', status: 'Scheduled', priest: 'Priest B', sessionTime: '2024-12-31T12:00', meetingLink: 'https://example.com' },
  ]);
  const [priests, setPriests] = useState(['Priest A', 'Priest B', 'Priest C']);
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPriest, setSelectedPriest] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [sessionDateTime, setSessionDateTime] = useState('');
  const [currentRequestId, setCurrentRequestId] = useState(null);

  const handleScheduleSession = () => {
    if (currentRequestId !== null) {
      setPujaRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === currentRequestId
            ? { ...req, priest: selectedPriest, sessionTime: sessionDateTime, meetingLink, status: 'Scheduled' }
            : req
        )
      );
      setShowModal(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-teal-200 text-teal-800';
      default:
        return 'bg-black text-white';
    }
  };

  const filteredRequests = pujaRequests.filter((request) => {
    if (!statusFilter) return true;
    return request.status === statusFilter;
  });

  return (
    <div className="bg-gradient-to-r from-teal-50 to-white min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center text-black mb-6">
          Manage Online Puja Requests
        </h1>

        <div className="mb-4">
          <select
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6">
          <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow-lg">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Priest</th>
                <th className="px-6 py-3 text-left">Session Time</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-t hover:bg-teal-50 transition duration-200">
                  <td className="px-6 py-4 text-black">{request.customerName}</td>
                  <td className="px-6 py-4 text-black">{request.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-black">{request.priest || 'Not Assigned'}</td>
                  <td className="px-6 py-4 text-black">{request.sessionTime || 'Not Scheduled'}</td>
                  <td className="px-6 py-4 flex space-x-3">
                    {request.status === 'Pending' && (
                      <button
                        onClick={() => {
                          setCurrentRequestId(request.id);
                          setShowModal(true);
                        }}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        Schedule Puja
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold text-center text-black mb-4">Schedule Puja</h2>

              <div className="mb-4">
                <label className="block text-black">Select Priest</label>
                <select
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  onChange={(e) => setSelectedPriest(e.target.value)}
                  value={selectedPriest}
                >
                  <option value="">Select Priest</option>
                  {priests.map((priest) => (
                    <option key={priest} value={priest}>
                      {priest}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-black">Meeting Link</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Enter Meeting Link"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-black">Schedule Time</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={sessionDateTime}
                  onChange={(e) => setSessionDateTime(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleSession}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  Schedule Puja
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageOnlinePuja;
