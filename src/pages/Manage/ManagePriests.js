import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function ManagePriests() {
  const [priests, setPriests] = useState([
    { id: 1, name: 'Priest A', service: 'Anushthaan', availability: 'Mon-Fri', active: true },
    { id: 2, name: 'Priest B', service: 'Online Puja', availability: 'Sat-Sun', active: false },
    { id: 3, name: 'Priest C', service: 'Kirtan', availability: 'Mon-Sat', active: true },
  ]);
  const [newPriest, setNewPriest] = useState({ name: '', service: '', availability: '', active: true });
  const [editingPriest, setEditingPriest] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePriestId, setDeletePriestId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewPriest, setViewPriest] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeactivatePopup, setShowDeactivatePopup] = useState(false); // New state for deactivation popup
  const [deactivatePriestId, setDeactivatePriestId] = useState(null); // New state to store priest id for deactivation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPriest({ ...newPriest, [name]: value });
  };

  const addPriest = () => {
    if (newPriest.name && newPriest.service && newPriest.availability) {
      setPriests([...priests, { ...newPriest, id: Date.now() }]);
      setNewPriest({ name: '', service: '', availability: '', active: true });
    } else {
      alert('Please fill all fields before adding a priest.');
    }
  };

  const savePriest = () => {
    if (editingPriest) {
      setPriests(
        priests.map((priest) =>
          priest.id === editingPriest.id ? { ...editingPriest, ...newPriest } : priest
        )
      );
      setEditingPriest(null);
      setNewPriest({ name: '', service: '', availability: '', active: true });
      setShowEditDialog(false);
    }
  };

  const confirmDelete = (id) => {
    setShowDeletePopup(true);
    setDeletePriestId(id);
  };

  const handleDelete = () => {
    setPriests(priests.filter((priest) => priest.id !== deletePriestId));
    setShowDeletePopup(false);
    setDeletePriestId(null);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDeletePriestId(null);
  };

  const toggleActive = (id) => {
    if (priests.find((priest) => priest.id === id).active) {
      // If priest is active, show deactivation confirmation popup
      setShowDeactivatePopup(true);
      setDeactivatePriestId(id);
    } else {
      setPriests(
        priests.map((priest) =>
          priest.id === id ? { ...priest, active: !priest.active } : priest
        )
      );
    }
  };

  const confirmDeactivation = () => {
    setPriests(
      priests.map((priest) =>
        priest.id === deactivatePriestId ? { ...priest, active: false } : priest
      )
    );
    setShowDeactivatePopup(false);
    setDeactivatePriestId(null);
  };

  const cancelDeactivation = () => {
    setShowDeactivatePopup(false);
    setDeactivatePriestId(null);
  };

  const startEdit = (priest) => {
    setEditingPriest(priest);
    setNewPriest(priest);
    setShowEditDialog(true);
  };

  const viewPriestDetails = (priest) => {
    setViewPriest(priest);
    setShowViewDialog(true);
  };

  const closeViewDialog = () => {
    setShowViewDialog(false);
    setViewPriest(null);
  };

  const closeEditDialog = () => {
    setShowEditDialog(false);
    setEditingPriest(null);
    setNewPriest({ name: '', service: '', availability: '', active: true });
  };

  return (
    <div className="bg-teal-50 min-h-screen">
      <div className="container mx-auto mt-5 px-4">
        <h1 className="text-3xl font-semibold text-teal-800 text-center mb-4">Manage Priests</h1>

        <div className="bg-white shadow-lg p-6 mb-6 rounded-lg">
          <h4 className="text-xl mb-4 text-teal-600">{editingPriest ? 'Edit Priest' : 'Add Priest'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={newPriest.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Priest Name"
              />
            </div>
            <div>
              <select
                name="service"
                value={newPriest.service}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Assign Service</option>
                <option value="Anushthaan">Anushthaan</option>
                <option value="Online Puja">Online Puja</option>
                <option value="Kirtan">Kirtan</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="availability"
                value={newPriest.availability}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Availability (e.g., Mon-Fri)"
              />
            </div>
            <div>
              <button
                onClick={editingPriest ? savePriest : addPriest}
                className="w-full py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
              >
                {editingPriest ? 'Save Priest' : 'Add Priest'}
              </button>
            </div>
          </div>
        </div>

        <h4 className="text-xl mb-4 text-teal-600">Priests List</h4>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Service</th>
              <th className="py-2 px-4 border">Availability</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {priests.map((priest) => (
              <tr key={priest.id} className="bg-white hover:bg-teal-100">
                <td className="py-2 px-4 border">{priest.name}</td>
                <td className="py-2 px-4 border">{priest.service}</td>
                <td className="py-2 px-4 border">{priest.availability}</td>
                <td className="py-2 px-4 border">{priest.active ? 'Active' : 'Inactive'}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    className="bg-indigo-500 text-white py-1 px-3 rounded-md hover:bg-indigo-600"
                    onClick={() => toggleActive(priest.id)}
                  >
                    {priest.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    className="bg-purple-500 text-white py-1 px-3 rounded-md hover:bg-purple-600"
                    onClick={() => viewPriestDetails(priest)}
                  >
                    View
                  </button>
                  <button
                    className="bg-cyan-500 text-white py-1 px-3 rounded-md hover:bg-cyan-600"
                    onClick={() => startEdit(priest)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-rose-500 text-white py-1 px-3 rounded-md hover:bg-rose-600"
                    onClick={() => confirmDelete(priest.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deactivate Confirmation Popup */}
      {showDeactivatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h4 className="text-lg font-semibold text-teal-800 mb-4">Confirm Deactivation</h4>
            <p className="mb-4">Are you sure you want to deactivate this priest?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={cancelDeactivation}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={confirmDeactivation}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h4 className="text-lg font-semibold text-teal-800 mb-4">Confirm Delete</h4>
            <p className="mb-4">Are you sure you want to delete this priest?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Dialog Box */}
      {showViewDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h4 className="text-lg font-semibold text-teal-800 mb-4">Priest Details</h4>
            <p><strong>Name:</strong> {viewPriest.name}</p>
            <p><strong>Service:</strong> {viewPriest.service}</p>
            <p><strong>Availability:</strong> {viewPriest.availability}</p>
            <p><strong>Status:</strong> {viewPriest.active ? 'Active' : 'Inactive'}</p>
            <div className="flex justify-end">
              <button
                className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeViewDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog Box */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h4 className="text-lg font-semibold text-teal-800 mb-4">Edit Priest</h4>
            <div>
              <input
                type="text"
                name="name"
                value={newPriest.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Priest Name"
              />
            </div>
            <div>
              <select
                name="service"
                value={newPriest.service}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Assign Service</option>
                <option value="Anushthaan">Anushthaan</option>
                <option value="Online Puja">Online Puja</option>
                <option value="Kirtan">Kirtan</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="availability"
                value={newPriest.availability}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Availability (e.g., Mon-Fri)"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeEditDialog}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                onClick={savePriest}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagePriests;
