import React, { useState } from "react";

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState({
    code: "",
    expirationDate: "",
    usageLimit: "",
  });
  const [promoList, setPromoList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromoCode({ ...promoCode, [name]: value });
  };

  const handleAddPromoCode = () => {
    if (promoCode.code && promoCode.expirationDate && promoCode.usageLimit) {
      if (isEditing) {
        const updatedPromoList = promoList.map((promo, index) =>
          index === editIndex ? promoCode : promo
        );
        setPromoList(updatedPromoList);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setPromoList([...promoList, promoCode]);
      }
      setPromoCode({ code: "", expirationDate: "", usageLimit: "" });
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleDeletePromoCode = (index) => {
    const updatedPromoList = promoList.filter((_, i) => i !== index);
    setPromoList(updatedPromoList);
  };

  const handleEditPromoCode = (index) => {
    setPromoCode(promoList[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-black mb-6">Promo Code Management</h1>

      <div className="space-y-4 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            name="code"
            value={promoCode.code}
            onChange={handleInputChange}
            placeholder="Promo Code"
            className="w-full p-2 border border-teal-300 rounded-md"
          />
          <input
            type="date"
            name="expirationDate"
            value={promoCode.expirationDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-teal-300 rounded-md"
          />
          <input
            type="number"
            name="usageLimit"
            value={promoCode.usageLimit}
            onChange={handleInputChange}
            placeholder="Usage Limit"
            className="w-full p-2 border border-teal-300 rounded-md"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleAddPromoCode}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          >
            {isEditing ? "Update" : "Add"} Promo Code
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-black">Promo Code List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-teal-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-teal-700">Promo Code</th>
                <th className="px-4 py-2 border-b text-teal-700">Expiration Date</th>
                <th className="px-4 py-2 border-b text-teal-700">Usage Limit</th>
                <th className="px-4 py-2 border-b text-teal-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promoList.map((promo, index) => (
                <tr key={index} className="text-center hover:bg-teal-50">
                  <td className="px-4 py-2 border-b">{promo.code}</td>
                  <td className="px-4 py-2 border-b">{promo.expirationDate}</td>
                  <td className="px-4 py-2 border-b">{promo.usageLimit}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleEditPromoCode(index)}
                      className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePromoCode(index)}
                      className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-800"
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
    </div>
  );
};

export default PromoCode;
