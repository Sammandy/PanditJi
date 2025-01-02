import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function ManageKirtans() {
  const [kirtans, setKirtans] = useState([]);
  const [newKirtan, setNewKirtan] = useState({ name: '', type: '', description: '' });
  const [priests] = useState([
    { id: 1, name: 'Priest 1' },
    { id: 2, name: 'Priest 2' },
    { id: 3, name: 'Priest 3' }
  ]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({}); // Track dropdown state for each Kirtan

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKirtan({ ...newKirtan, [name]: value });
  };

  const addKirtan = () => {
    if (newKirtan.name && newKirtan.type) {
      setKirtans([...kirtans, { ...newKirtan, id: Date.now(), assignedPriest: null }]);
      setNewKirtan({ name: '', type: '', description: '' });
    } else {
      alert('Please fill all fields before adding a Kirtan.');
    }
  };

  const assignKirtan = (id, priestId) => {
    // Here, you can update the assigned priest of the Kirtan service
    setKirtans(kirtans.map(kirtan => 
      kirtan.id === id ? { ...kirtan, assignedPriest: priestId } : kirtan
    ));
    setDropdownOpen((prev) => ({ ...prev, [id]: false })); // Close the dropdown after selection
  };

  const confirmDelete = (id) => {
    setShowConfirmDelete(id);
  };

  const deleteKirtan = () => {
    setKirtans(kirtans.filter((kirtan) => kirtan.id !== showConfirmDelete));
    setShowConfirmDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-3xl font-semibold text-center mb-4 text-teal-800">Kirtan Management</h1>

      <div className="bg-transparent shadow-lg p-6 mb-6 rounded-lg border border-teal-500">
        <h4 className="text-xl mb-4 text-teal-800">Add Kirtan Service</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              name="name"
              value={newKirtan.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Kirtan Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="type"
              value={newKirtan.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Kirtan Type (e.g., Bhajan, Kirtan)"
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              value={newKirtan.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Description"
            />
          </div>
          <div>
            <button onClick={addKirtan} className="w-full py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
              Add Kirtan
            </button>
          </div>
        </div>
      </div>

      <h4 className="text-xl mb-4 text-teal-800">Kirtans List</h4>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-teal-500 text-white">
          <tr>
            <th className="py-2 px-4 border">Kirtan Name</th>
            <th className="py-2 px-4 border">Type</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kirtans.map((kirtan) => (
            <tr key={kirtan.id} className="hover:bg-teal-100">
              <td className="py-2 px-4 border text-teal-800">{kirtan.name}</td>
              <td className="py-2 px-4 border text-teal-800">{kirtan.type}</td>
              <td className="py-2 px-4 border text-teal-800">{kirtan.description}</td>
              <td className="py-2 px-4 border">
                {/* Priest Dropdown */}
                <div className="relative inline-block text-left">
                  <button
                    className="bg-teal-500 text-white py-1 px-3 rounded-md hover:bg-teal-600 flex items-center"
                    onClick={() => toggleDropdown(kirtan.id)}
                  >
                    {kirtan.assignedPriest ? `Assigned to ${priests.find(priest => priest.id === kirtan.assignedPriest)?.name}` : 'Assign Priest'}
                    <span className="ml-2">
                      {dropdownOpen[kirtan.id] ? '▲' : '▼'}
                    </span>
                  </button>
                  {dropdownOpen[kirtan.id] && (
                    <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {priests.map((priest) => (
                          <button
                            key={priest.id}
                            onClick={() => assignKirtan(kirtan.id, priest.id)}
                            className="block px-4 py-2 text-sm text-teal-800 hover:bg-teal-100"
                          >
                            {priest.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Delete button with confirmation */}
                <button
                  className="bg-teal-500 text-white py-1 px-3 rounded-md hover:bg-teal-600 ml-2"
                  onClick={() => confirmDelete(kirtan.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Popup */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-teal-800">Are you sure you want to delete this Kirtan?</h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={deleteKirtan}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageKirtans;
