import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pandit() {
  const [pandits, setPandits] = useState([
    {
      id: 1,
      name: 'Pandit A',
      specialization: 'Vedic Astrology',
      bookingStatus: 'Available',
      phone: '123-456-7890',
      address: '123 Temple Street, Mystic City',
      description: 'Expert in Vedic Astrology and performing various poojas.',
      expertise: 'Astrology, Kundli Matching',
    },
    {
      id: 2,
      name: 'Pandit B',
      specialization: 'Numerology',
      bookingStatus: 'Busy',
      phone: '987-654-3210',
      address: '456 Mystic Avenue, Spiritual Town',
      description: 'Specialized in Numerology and personalized remedies.',
      expertise: 'Numerology, Name Correction',
    },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    const updatedPandits = pandits.filter((pandit) => pandit.id !== deleteId);
    setPandits(updatedPandits);
    setDeleteId(null);
    setShowConfirmation(false);
    console.log('Deleted Pandit with ID:', deleteId);
  };

  const handleView = (id) => {
    const pandit = pandits.find((pandit) => pandit.id === id);
    setSelectedPandit(pandit);
    setIsEditMode(false);
  };

  const handleEdit = (id) => {
    const pandit = pandits.find((pandit) => pandit.id === id);
    setSelectedPandit(pandit);
    setIsEditMode(true);
  };

  const saveChanges = () => {
    setPandits((prevPandits) =>
      prevPandits.map((pandit) =>
        pandit.id === selectedPandit.id ? selectedPandit : pandit
      )
    );
    setSelectedPandit(null);
    setIsEditMode(false);
    console.log('Updated Pandit:', selectedPandit);
  };

  const closeDetails = () => {
    setSelectedPandit(null);
    setIsEditMode(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-teal-200 text-teal-700';
      case 'Busy':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-teal-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-black-800 mb-6">
          Pandit Management
        </h1>
        <p className="text-center text-teal-600 mb-8">
          Manage Pandits and their booking statuses.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Specialization</th>
                <th className="px-6 py-3 text-left">Booking Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pandits.map((pandit) => (
                <tr
                  key={pandit.id}
                  className="border-t hover:bg-gradient-to-r from-teal-50 to-teal-100 transition duration-200"
                >
                  <td className="px-6 py-4 text-teal-800">{pandit.name}</td>
                  <td className="px-6 py-4 text-teal-800">{pandit.specialization}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        pandit.bookingStatus
                      )}`}
                    >
                      {pandit.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <button
                      onClick={() => handleView(pandit.id)}
                      className="px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-md hover:from-teal-500 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(pandit.id)}
                      className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-md hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(pandit.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
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

      {selectedPandit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold text-teal-800 mb-4">
              {isEditMode ? `Edit ${selectedPandit.name}` : `${selectedPandit.name}'s Details`}
            </h2>
            <div className="space-y-2">
              {['name', 'phone', 'address', 'description', 'expertise'].map((field) => (
                <div key={field}>
                  <label className="block font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={selectedPandit[field]}
                      onChange={(e) =>
                        setSelectedPandit({ ...selectedPandit, [field]: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p>{selectedPandit[field]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-3">
              {isEditMode ? (
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                >
                  Save
                </button>
              ) : null}
              <button
                onClick={closeDetails}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="mb-4 text-gray-800 text-lg">
              Are you sure you want to delete this Pandit?
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pandit;
