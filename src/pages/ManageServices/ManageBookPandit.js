import React, { useState } from 'react';

function ManageBookPandit() {
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Booking 1', pandit: 'Pandit A', status: 'Pending', description: 'This is the first booking.' },
    { id: 2, name: 'Booking 2', pandit: 'Pandit B', status: 'Confirmed', description: 'This is the second booking.' },
    { id: 3, name: 'Booking 3', pandit: 'Pandit C', status: 'Completed', description: 'This is the third booking.' },
  ]);

  const [availablePandits] = useState([
    { id: 1, name: 'Pandit A' },
    { id: 2, name: 'Pandit B' },
    { id: 3, name: 'Pandit C' },
    { id: 4, name: 'Pandit D' },
    { id: 5, name: 'Pandit E' },
    { id: 6, name: 'Pandit F' },
  ]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [reassignModal, setReassignModal] = useState({ open: false, bookingId: null });
  const [newPandit, setNewPandit] = useState('');
  const [deleteModal, setDeleteModal] = useState({ open: false, bookingId: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [showPanditList, setShowPanditList] = useState(false);

  const handleAssignPandit = (id, newPandit) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, pandit: newPandit } : booking
    );
    setBookings(updatedBookings);
    setReassignModal({ open: false, bookingId: null });
  };

  const handleDeleteBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    setDeleteModal({ open: false, bookingId: null });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-teal-100 text-teal-700';
      case 'Confirmed':
        return 'bg-teal-200 text-teal-800';
      case 'Completed':
        return 'bg-teal-300 text-teal-900';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPandits = availablePandits.filter(
    (pandit) =>
      pandit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pandit.id.toString().includes(searchTerm)
  );

  const filteredBookings =
    filterStatus === 'All' ? bookings : bookings.filter((booking) => booking.status === filterStatus);

  return (
    <div className="bg-teal-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-teal-800 mb-6">Manage Book Pandit</h1>
        <p className="text-center text-teal-600 mb-8">Assign Pandits and manage booking statuses efficiently.</p>

        <div className="mb-6 flex justify-end">
          <label className="text-teal-800 font-medium mr-4">Filter by Status:</label>
          <select
            className="px-4 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-80 overflow-y-auto border border-teal-300 rounded-lg">
            <table className="table-auto w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Booking Name</th>
                  <th className="px-4 py-3 text-left font-bold">Pandit</th>
                  <th className="px-4 py-3 text-left font-bold">Status</th>
                  <th className="px-4 py-3 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t hover:bg-teal-50 transition duration-200"
                  >
                    <td className="px-4 py-3 text-teal-800 font-medium">{booking.name}</td>
                    <td className="px-4 py-3">{booking.pandit}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-3">
                      <button
                        className="px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition"
                        onClick={() => setSelectedDescription(booking.description)}
                      >
                        View Description
                      </button>
                      <button
                        className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-teal-700 transition"
                        onClick={() => setReassignModal({ open: true, bookingId: booking.id })}
                      >
                        Reassign
                      </button>
                      <button
                        className="px-4 py-2 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-800 transition"
                        onClick={() => setDeleteModal({ open: true, bookingId: booking.id })}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Description Modal */}
        {selectedDescription && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-bold text-teal-700">Booking Description</h2>
              <p className="mt-4">{selectedDescription}</p>
              <button
                className="mt-6 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                onClick={() => setSelectedDescription(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold text-teal-700">Are you sure you want to delete this booking?</h2>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition"
                  onClick={() => handleDeleteBooking(deleteModal.bookingId)}
                >
                  Yes, Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  onClick={() => setDeleteModal({ open: false, bookingId: null })}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reassign Pandit Modal */}
        {reassignModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold text-teal-700">Reassign Pandit</h2>
              
              {/* Searchable dropdown */}
              <div className="relative mt-4">
                <input
                  type="text"
                  className="px-4 py-2 w-full border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Search by Pandit name or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={() => setShowPanditList(true)} // Open the dropdown when typing
                />
                {showPanditList && (
                  <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-teal-300 rounded-lg shadow-lg">
                    <ul>
                      {filteredPandits.map((pandit) => (
                        <li
                          key={pandit.id}
                          className="px-4 py-2 cursor-pointer hover:bg-teal-100"
                          onClick={() => {
                            setNewPandit(pandit.name);
                            setSearchTerm(pandit.name); // Set the input value to the selected Pandit
                            setShowPanditList(false); // Close the dropdown when a Pandit is selected
                          }}
                        >
                          {pandit.name} (ID: {pandit.id})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  onClick={() => setReassignModal({ open: false, bookingId: null })}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition"
                  onClick={() => handleAssignPandit(reassignModal.bookingId, newPandit)}
                >
                  Reassign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBookPandit;
