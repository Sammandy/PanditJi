import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const ViewUsers = () => {
  // Mock user data (replace with your actual API data when available)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'User' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin' },
  ]);

  const [editingUser, setEditingUser] = useState(null); // Track which user is being edited
  const [updatedUser, setUpdatedUser] = useState({}); // Track changes for the edited user
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Handle the previous and next button click
  const handlePrevious = () => alert('Previous button clicked!');
  const handleNext = () => alert('Next button clicked!');

  // Handle edit button click
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUpdatedUser({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // Handle changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle saving the edited user data
  const handleSave = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    setEditingUser(null); // Reset editing state
  };

  // Handle delete button click with confirmation
  const handleDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setShowConfirmation(false); // Close the confirmation modal
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal
  };

  return (
    <div className="view-users-container">
      <h2 className="text-teal-600 text-3xl font-semibold mb-6">View Users</h2>

      {/* Table displaying users */}
      <Table striped bordered hover className="mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="role"
                      value={updatedUser.role}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <Button
                      variant="success"
                      className="py-2 px-6 rounded-lg shadow-md hover:bg-green-500 transition-all"
                      style={{ minWidth: '100px', marginRight: '5px' }}
                      onClick={() => handleSave(user.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      className="py-2 px-6 rounded-lg shadow-md hover:bg-teal-500 transition-all mr-2"
                      style={{ minWidth: '100px' }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                  )}

                  <Button
                    variant="danger"
                    className="py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all"
                    style={{ minWidth: '100px' }}
                    onClick={() => confirmDelete(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              {editingUser === user.id && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-600 mt-2">
                    <p>You can edit the information here.</p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* Confirmation Modal for Delete */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="mb-4 text-gray-800 text-lg">
              Are you sure you want to delete this user?
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

      {/* Button container */}
      <div className="flex justify-between items-center mt-6">
        <Link to="/Manage/ManageUsers">
          <button
            type="button"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
            style={{ minWidth: '100px' }}
            onClick={handlePrevious}
          >
            Previous
          </button>
        </Link>

        {/* <button
          type="button"
          className="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-lg shadow-md transition-all"
          style={{ minWidth: '100px' }}
        >
          View Users
        </button> */}

        <Link to="/ManageUser/Next">
          <button
            type="button"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
            style={{ minWidth: '100px' }}
            onClick={handleNext}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewUsers;
