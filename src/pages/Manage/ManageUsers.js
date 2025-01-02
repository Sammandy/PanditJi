import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageUser = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (action) => {
    setSelectedAction(action);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      {/* Manage User Header */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Manage Users
      </h2>
      {/* Main Buttons Row */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-lg text-lg font-medium transition-all w-64"
          onClick={() => handleButtonClick('manageUsers')}
        >
          Manage Users
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-lg text-lg font-medium transition-all w-64"
          onClick={() => handleButtonClick('viewBookings')}
        >
          View Booking History
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-lg text-lg font-medium transition-all w-64"
          onClick={() => handleButtonClick('manageComplaints')}
        >
          Manage Complaints
        </button>
      </div>

      {/* Action Panels */}
      <div className="flex flex-wrap justify-center gap-6">
        {selectedAction === 'manageUsers' && (
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Users</h3>
            <div className="space-y-3">
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-all"
                onClick={() => navigate('/create-user')}
              >
                Create User
              </button>
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-all"
                onClick={() => navigate('/view-users')}
              >
                View Users
              </button>
              {/* <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-all"
                onClick={() => navigate('/edit-user')}
              >
                Edit User
              </button> */}
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-all"
                onClick={() => navigate('/delete-user')}
              >
                Delete User
              </button>
            </div>
          </div>
        )}

        {selectedAction === 'viewBookings' && (
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking History</h3>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-all"
              onClick={() => navigate('/view-bookings')}
            >
              View Bookings
            </button>
          </div>
        )}

        {selectedAction === 'manageComplaints' && (
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Complaints</h3>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-all"
              onClick={() => navigate('/submit-complaint')}
            >
              Submit Complaint
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
