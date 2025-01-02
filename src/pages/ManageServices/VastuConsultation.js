// VastuConsultation.js
import React, { useState } from 'react';

const VastuConsultation = () => {
  const [consultations, setConsultations] = useState([
    { id: 1, customer: 'John Doe', date: '2024-12-30', expert: 'Unassigned' },
    { id: 2, customer: 'Jane Smith', date: '2024-12-31', expert: 'Pandit Sharma' },
  ]);
  const [experts] = useState(['Pandit Sharma', 'Pandit Verma', 'Pandit Rao']);

  const assignExpert = (consultationId, expert) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === consultationId ? { ...c, expert: expert || 'Unassigned' } : c
      )
    );
  };

  return (
    <div className="p-6 bg-teal-100 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-4">Manage Vastu Consultations</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-teal-600">
            <tr>
              <th className="px-4 py-2 text-left text-white">Customer</th>
              <th className="px-4 py-2 text-left text-white">Date</th>
              <th className="px-4 py-2 text-left text-white">Assigned Expert</th>
              <th className="px-4 py-2 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr key={consultation.id} className="border-b">
                <td className="px-4 py-2 text-black">{consultation.customer}</td>
                <td className="px-4 py-2 text-black">{consultation.date}</td>
                <td className="px-4 py-2 text-black">{consultation.expert}</td>
                <td className="px-4 py-2">
                  <select
                    className="border rounded px-2 py-1 focus:ring-2 focus:ring-teal-500"
                    onChange={(e) => assignExpert(consultation.id, e.target.value)}
                    defaultValue={consultation.expert || 'Unassigned'}
                  >
                    <option value="Unassigned">Unassigned</option>
                    {experts.map((expert) => (
                      <option key={expert} value={expert}>
                        {expert}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VastuConsultation;
