import React, { useState } from 'react';

function ManageKirtan() {
  const [kirtanData, setKirtanData] = useState([
    {
      id: 1,
      serviceName: 'Kirtan Ceremony 1',
      priests: [],
      completionStatus: 'Pending',
      description: 'This is the description for Kirtan Ceremony 1.',
    },
    {
      id: 2,
      serviceName: 'Kirtan Ceremony 2',
      priests: [],
      completionStatus: 'Pending',
      description: 'This is the description for Kirtan Ceremony 2.',
    },
    {
      id: 3,
      serviceName: 'Kirtan Ceremony 3',
      priests: [],
      completionStatus: 'Completed',
      description: 'This is the description for Kirtan Ceremony 3.',
    },
  ]);

  const [priests] = useState([
    { id: 1, name: 'Priest A' },
    { id: 2, name: 'Priest B' },
    { id: 3, name: 'Priest C' },
  ]);

  const [selectedDescription, setSelectedDescription] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All'); // State for filter

  const handleAssignPriest = (serviceId, priestId) => {
    setKirtanData(prevData =>
      prevData.map(service =>
        service.id === serviceId
          ? {
              ...service,
              priests: [...service.priests, priests.find(priest => priest.id === priestId).name],
            }
          : service
      )
    );
  };

  const handleUpdateCompletionStatus = (serviceId, status) => {
    setKirtanData(prevData =>
      prevData.map(service =>
        service.id === serviceId
          ? { ...service, completionStatus: status }
          : service
      )
    );
  };

  const handleDeleteService = (serviceId) => {
    setKirtanData(prevData => prevData.filter(service => service.id !== serviceId));
    setIsDeleteModalOpen(false); // Close the modal after deletion
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-teal-200 text-teal-700';
      case 'Pending':
        return 'bg-gray-300 text-black';
      default:
        return 'bg-gray-100 text-black';
    }
  };

  // Filtered data based on selected status
  const filteredData = filterStatus === 'All' ? kirtanData : kirtanData.filter(service => service.completionStatus === filterStatus);

  return (
    <div className="bg-gradient-to-r from-teal-50 to-white min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-teal-800 mb-6">
          Manage Kirtan Ceremonies
        </h1>
        <p className="text-center text-black mb-8">
          Manage and track the progress of Kirtan ceremonies with ease.
        </p>

        {/* Filter Dropdown */}
        <div className="mb-4 text-center">
          <label htmlFor="statusFilter" className="mr-2 text-teal-800 font-semibold">Filter by Status:</label>
          <select
            id="statusFilter"
            className="form-select px-4 py-2 rounded-md bg-teal-600 text-white focus:outline-none"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-black rounded-lg shadow-lg">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Service Name</th>
                <th className="px-6 py-3 text-left">Assigned Priests</th>
                <th className="px-6 py-3 text-left">Completion Status</th>
                <th className="px-6 py-3 text-left">Assign Priest</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((service) => (
                <tr
                  key={service.id}
                  className="border-t hover:bg-teal-50 transition duration-200"
                >
                  <td className="px-6 py-4 text-black">{service.serviceName}</td>
                  <td className="px-6 py-4 text-black">{service.priests.length > 0 ? service.priests.join(', ') : 'Not Assigned'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(service.completionStatus)}`}
                    >
                      {service.completionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="form-select px-4 py-2 rounded-md bg-teal-600 text-white focus:outline-none"
                      onChange={(e) => handleAssignPriest(service.id, parseInt(e.target.value))}
                      value=""
                    >
                      <option value="">Select Priest</option>
                      {priests.map((priest) => (
                        <option key={priest.id} value={priest.id}>
                          {priest.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-700 transition"
                      onClick={() => setSelectedDescription(service.description)}
                    >
                      View Description
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700 transition"
                      onClick={() => {
                        setSelectedServiceId(service.id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Description */}
        {selectedDescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-teal-800">Kirtan Description</h2>
              <p className="text-black">{selectedDescription}</p>
              <button
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-700 transition"
                onClick={() => setSelectedDescription(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-teal-800">Confirm Deletion</h2>
              <p className="text-black">Are you sure you want to delete this Kirtan Ceremony?</p>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-800 transition"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700 transition"
                  onClick={() => handleDeleteService(selectedServiceId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageKirtan;
