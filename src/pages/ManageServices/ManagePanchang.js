import React, { useState } from "react";

const ManagePanchang = () => {
  const [panchangDetails, setPanchangDetails] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    sunrise: "",
    sunset: "",
    tithi: "",
    nakshatra: "",
    specialNote: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updatedDetails = [...panchangDetails];
      updatedDetails[editingIndex] = formData;
      setPanchangDetails(updatedDetails);
      setEditingIndex(null);
    } else {
      setPanchangDetails([...panchangDetails, formData]);
    }
    setFormData({
      date: "",
      sunrise: "",
      sunset: "",
      tithi: "",
      nakshatra: "",
      specialNote: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(panchangDetails[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDetails = panchangDetails.filter((_, i) => i !== index);
    setPanchangDetails(updatedDetails);
  };

  return (
    <div className="p-8 bg-teal-50 min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-6">Manage Panchang</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-teal-200">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6">
          {editingIndex !== null ? "Edit Panchang Detail" : "Add Panchang Detail"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["date", "sunrise", "sunset", "tithi", "nakshatra", "specialNote"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-black mb-2 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "date" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="mt-6 w-full sm:w-auto px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
        >
          {editingIndex !== null ? "Update Detail" : "Add Detail"}
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 border border-teal-200">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6">Panchang Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-teal-200">
            <thead className="bg-teal-100">
              <tr>
                {["Date", "Sunrise", "Sunset", "Tithi", "Nakshatra", "Special Note", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-sm font-semibold text-teal-600 border-b border-teal-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {panchangDetails.length > 0 ? (
                panchangDetails.map((detail, index) => (
                  <tr key={index} className="hover:bg-teal-50">
                    {Object.values(detail).map((value, i) => (
                      <td key={i} className="px-6 py-3 text-sm text-black border-b border-teal-300">
                        {value}
                      </td>
                    ))}
                    <td className="px-6 py-3 text-sm text-center border-b border-teal-300">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center px-6 py-3 text-gray-600">
                    No Panchang details found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePanchang;
