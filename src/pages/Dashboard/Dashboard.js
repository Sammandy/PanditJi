// import React from 'react'
// import Navbar from './Navbar';
// import Hero from './Hero';
// import Footer from './Footer';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <br></br>
//       <Hero />
//       <Footer />
//     </div>
//   )
// }

// export default Dashboard
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for "Days vs Growth Rate"
  const growthRateData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Growth Rate (%)",
        data: [20, 35, 40, 55, 50, 75, 90],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        pointBackgroundColor: "#4F46E5",
        tension: 0.4,
      },
    ],
  };

  // Data for "Enquiry vs Actual Customers"
  const enquiryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Enquiries",
        data: [50, 60, 80, 70, 90, 100],
        backgroundColor: "rgba(244, 114, 182, 0.8)",
      },
      {
        label: "Actual Customers",
        data: [30, 40, 60, 50, 70, 85],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Top Boxes */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {[
          { color: "bg-red-500", title: "Total Appointments Today", value: 0 },
          { color: "bg-orange-400", title: "Upcoming Appointments", value: 0 },
          { color: "bg-blue-400", title: "In Progress Appointments", value: 0 },
          { color: "bg-teal-400", title: " Completed Ceremonies", value: 0 },
          { color: "bg-yellow-400", title: "Cancelled Appointments", value: 0 },
          { color: "bg-gray-400", title: "Missed Appointments", value: 0 },
        ].map((box, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-32 rounded-md text-white ${box.color}`}
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{box.value}</p>
              <p className="mt-2 text-sm">{box.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Days vs Growth Rate Chart */}
        <div className="bg-white rounded-md shadow p-4 h-50 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Days vs Growth Rate</h2>
          <Line data={growthRateData} />
        </div>

        {/* Enquiry vs Actual Customers Chart */}
        <div className="bg-white rounded-md shadow p-4 h-64 col-span-1">
          <h2 className="text-lg font-semibold mb-4">
            Enquiry vs Actual Customers
          </h2>
          <Bar data={enquiryData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
