import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", { name, email, role });
      alert("User created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-700 text-center mb-6">Create User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-teal-800 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-800 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role Select */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-teal-800 mb-2">
              Role
            </label>
            <select
              id="role"
              className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
              style={{ minWidth: "100px" }}
              onClick={() => navigate("/manage/manage-users")}
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-lg shadow-md transition-all"
            >
              Create User
            </button>
            <button
              type="button"
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md transition-all"
              style={{ minWidth: "100px" }}
              onClick={() => alert("Next button clicked!")}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
