import React, { useState } from "react";

const ManageHoroscope = () => {
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHoroscopeData = async () => {
    setLoading(true);
    try {
      // Simulate fetching horoscope data using a third-party API
      const response = await fetch("https://thirdpartyapi.com/horoscopes");
      const data = await response.json();
      setHoroscopeData(data);
    } catch (error) {
      console.error("Error fetching horoscope data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-teal-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-teal-200">
        <h1 className="text-3xl font-extrabold text-black mb-6">Horoscope Management</h1>
        <p className="text-lg text-black mb-8">
          Generate and manage horoscopes for your users. Use the button below to fetch the latest horoscope data.
        </p>
        
        <div className="flex justify-start mb-8">
          <button
            onClick={fetchHoroscopeData}
            className="bg-white border-2 border-teal-600 text-teal-600 py-2 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-200 transition ease-in-out duration-200 shadow-md hover:bg-teal-100 hover:text-teal-700"
          >
            {loading ? "Loading..." : "Fetch Horoscope Data"}
          </button>
        </div>

        <div className="space-y-6">
          {horoscopeData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {horoscopeData.map((horoscope, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-teal-200 shadow-md hover:shadow-lg transition ease-in-out duration-300"
                >
                  <h2 className="text-xl font-semibold text-black mb-2">{horoscope.sign}</h2>
                  <p className="text-sm text-gray-600">{horoscope.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black text-center mt-4">
              No horoscope data available. Click "Fetch Horoscope Data" to load data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageHoroscope;
