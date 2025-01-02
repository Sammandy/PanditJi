import React, { useState } from 'react';

const NotificationM = () => {
  const [notification, setNotification] = useState('');
  const [schedule, setSchedule] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  const handleSendNotification = () => {
    alert('Notification sent: ' + notification);
  };

  const handleScheduleNotification = () => {
    alert(`Notification scheduled for: ${schedule}`);
    setIsScheduled(true);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-black mb-4">Manage Notifications</h1>
      <p className="text-gray-700 mb-6">
        Create and send push notifications to users and priests. Schedule notification campaigns.
      </p>

      <div className="space-y-6">
        {/* Create Notification */}
        <div className="bg-teal-50 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-medium text-teal-700 mb-3">Create and Send Notification</h2>
          <textarea
            className="w-full p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter notification content..."
            rows="4"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
          />
          <button
            onClick={handleSendNotification}
            className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none"
          >
            Send Notification
          </button>
        </div>

        {/* Schedule Notification */}
        <div className="bg-teal-50 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-medium text-teal-700 mb-3">Schedule Notification</h2>
          <textarea
            className="w-full p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter notification content for scheduling..."
            rows="4"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
          />
          <input
            type="datetime-local"
            className="w-full mt-4 p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
          <button
            onClick={handleScheduleNotification}
            className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none"
          >
            Schedule Notification
          </button>
          {isScheduled && (
            <p className="mt-2 text-sm text-teal-600">Notification scheduled successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationM;
