import React, { useState } from "react";

const TalkToA = () => {
  const [astrologers, setAstrologers] = useState([
    {
      id: 1,
      name: "Astrologer A",
      availability: "9:00 AM - 5:00 PM",
      rate: 50,
      feedback: ["Great advice!", "Very accurate."],
    },
    {
      id: 2,
      name: "Astrologer B",
      availability: "11:00 AM - 6:00 PM",
      rate: 60,
      feedback: ["Helpful session.", "Detailed analysis."],
    },
  ]);

  const updateAvailability = (id, newAvailability) => {
    setAstrologers((prev) =>
      prev.map((astro) =>
        astro.id === id ? { ...astro, availability: newAvailability } : astro
      )
    );
  };

  const updateRate = (id, newRate) => {
    setAstrologers((prev) =>
      prev.map((astro) =>
        astro.id === id ? { ...astro, rate: newRate } : astro
      )
    );
  };

  return (
    <div className="p-8 bg-teal-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-black">
        Talk to Astrologer Management
      </h1>

      {astrologers.map((astro) => (
        <div
          key={astro.id}
          className="bg-white shadow-md rounded-lg p-6 mb-4 border border-teal-200"
        >
          <h2 className="text-xl font-bold mb-2 text-teal-700">{astro.name}</h2>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Availability:</label>
            <input
              type="text"
              value={astro.availability}
              onChange={(e) => updateAvailability(astro.id, e.target.value)}
              className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Rate:</label>
            <input
              type="number"
              value={astro.rate}
              onChange={(e) => updateRate(astro.id, e.target.value)}
              className="w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Feedback:</label>
            <ul className="list-disc list-inside">
              {astro.feedback.map((comment, index) => (
                <li key={index} className="text-gray-600">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TalkToA;
