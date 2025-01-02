import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const DeleteUser = () => {
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ]);

  // Handle delete user (removes user from the local state)
  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handlePrevious = () => {
    alert('Previous button clicked!');
  };

  const handleNext = () => {
    alert('Next button clicked!');
  };

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6">Delete User</h2>

      <div className="space-y-4">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-medium text-teal-800">{user.name}</p>
              <Button
                variant="danger"
                onClick={() => handleDelete(user.id)}
                className="py-2 px-4 text-xs"
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users available.</p>
        )}
      </div>

      {/* Button container */}
      <div className="flex justify-between items-center mt-6">
        <Link to="/Manage/ManageUsers" className="w-1/3">
          <button
            type="button"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
            style={{ minWidth: "120px" }}
            onClick={handlePrevious}
          >
            Previous
          </button>
        </Link>
        <button
          type="button"
          className="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-lg shadow-md transition-all"
          style={{ minWidth: "120px" }}
        >
          Delete All Users
        </button>
        <button
          type="button"
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
          style={{ minWidth: "120px" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
