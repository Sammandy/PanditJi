import React, { useState } from 'react';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    email: '',
    subscriptionDate: '',
  });
  const [editSubscription, setEditSubscription] = useState({
    id: null,
    name: '',
    email: '',
    subscriptionDate: '',
  });

  const handleInputChange = (e, field, modal = 'create') => {
    const value = e.target.value;
    if (modal === 'create') {
      setNewSubscription((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setEditSubscription((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleCreate = () => {
    const newSub = { ...newSubscription, id: Date.now() };
    setSubscriptions((prev) => [...prev, newSub]);
    setNewSubscription({ name: '', email: '', subscriptionDate: '' });
    setModalOpen(false);
  };

  const handleUpdate = () => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === editSubscription.id ? editSubscription : sub
      )
    );
    setEditSubscription({ id: null, name: '', email: '', subscriptionDate: '' });
    setEditModalOpen(false);
  };

  const handleDelete = (id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Priest Subscription Management</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
        >
          Add Subscription
        </button>
      </div>

      {/* Subscription Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-teal-100 text-teal-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Subscription Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="border-t">
                <td className="px-4 py-2">{sub.name}</td>
                <td className="px-4 py-2">{sub.email}</td>
                <td className="px-4 py-2">{sub.subscriptionDate}</td>
                <td className="px-4 py-2 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditSubscription(sub);
                      setEditModalOpen(true);
                    }}
                    className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {modalOpen && (
        <div className="modal fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Add New Subscription</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Priest Name</label>
                <input
                  type="text"
                  value={newSubscription.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Priest Email</label>
                <input
                  type="email"
                  value={newSubscription.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Subscription Date</label>
                <input
                  type="date"
                  value={newSubscription.subscriptionDate}
                  onChange={(e) => handleInputChange(e, 'subscriptionDate')}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCreate}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                >
                  Create
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Subscription</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Priest Name</label>
                <input
                  type="text"
                  value={editSubscription.name}
                  onChange={(e) => handleInputChange(e, 'name', 'edit')}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Priest Email</label>
                <input
                  type="email"
                  value={editSubscription.email}
                  onChange={(e) => handleInputChange(e, 'email', 'edit')}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Subscription Date</label>
                <input
                  type="date"
                  value={editSubscription.subscriptionDate}
                  onChange={(e) => handleInputChange(e, 'subscriptionDate', 'edit')}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                >
                  Update
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setEditModalOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
