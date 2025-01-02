import React, { useState, useEffect } from 'react';

const ManageKundaliM = () => {
    const [requests, setRequests] = useState([]); // Store Kundli matching requests
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedRequest, setSelectedRequest] = useState(null); // Selected request for report generation
    const [reportContent, setReportContent] = useState(''); // Content of the generated report

    // Simulate API calls to fetch requests
    useEffect(() => {
        const fetchData = async () => {
            const fetchedRequests = await mockFetchRequests();
            setRequests(fetchedRequests);
            setLoading(false);
        };

        fetchData();
    }, []);

    const mockFetchRequests = async () => {
        return [
            { id: 1, user1: 'User1', user2: 'User2', status: 'Pending', date: '2024-12-20' },
            { id: 2, user1: 'User3', user2: 'User4', status: 'Completed', date: '2024-12-21' },
            { id: 3, user1: 'User5', user2: 'User6', status: 'Pending', date: '2024-12-22' },
        ];
    };

    const handleStatusChange = (requestId, status) => {
        setRequests(requests.map(request =>
            request.id === requestId ? { ...request, status: status } : request
        ));
        alert(`Status of request ID ${requestId} updated to ${status}`);
    };

    const generateReport = () => {
        if (!selectedRequest) return;

        // Simulate generating a report based on the selected request
        const report = `Kundli Matching Report\n\nUser1: ${selectedRequest.user1}\nUser2: ${selectedRequest.user2}\nStatus: ${selectedRequest.status}\nDate: ${selectedRequest.date}`;
        setReportContent(report);
    };

    const sendReport = () => {
        if (!reportContent) return;

        // Simulate sending the report (in a real app, this would involve sending an email or notification)
        alert(`Report sent to users for request ID ${selectedRequest.id}:\n\n${reportContent}`);
    };

    return (
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-extrabold text-black text-center mb-6">Manage Kundli Matching Requests</h2>

                {loading ? (
                    <div className="flex justify-center items-center text-xl text-black">Loading...</div>
                ) : (
                    <>
                        {/* Request Table */}
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                            <table className="min-w-full table-auto">
                                <thead className="bg-teal-500">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-sm font-medium text-white">Request ID</th>
                                        <th className="py-3 px-6 text-left text-sm font-medium text-white">User 1</th>
                                        <th className="py-3 px-6 text-left text-sm font-medium text-white">User 2</th>
                                        <th className="py-3 px-6 text-left text-sm font-medium text-white">Status</th>
                                        <th className="py-3 px-6 text-left text-sm font-medium text-white">Date</th>
                                        <th className="py-3 px-6 text-left text-sm font-medium text-white">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(request => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6 text-sm text-black">{request.id}</td>
                                            <td className="py-4 px-6 text-sm text-black">{request.user1}</td>
                                            <td className="py-4 px-6 text-sm text-black">{request.user2}</td>
                                            <td className="py-4 px-6 text-sm text-black">{request.status}</td>
                                            <td className="py-4 px-6 text-sm text-black">{request.date}</td>
                                            <td className="py-4 px-6 text-sm">
                                                <button
                                                    className="bg-teal-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-teal-600"
                                                    onClick={() => setSelectedRequest(request)}
                                                >
                                                    Select
                                                </button>
                                                <select
                                                    value={request.status}
                                                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                                    className="bg-white border border-gray-300 rounded-md px-2 py-1"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Report Section */}
                        {selectedRequest && (
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-black mb-4">Generate and Send Report for Request ID {selectedRequest.id}</h3>
                                <button
                                    className="bg-teal-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-teal-600"
                                    onClick={generateReport}
                                >
                                    Generate Report
                                </button>

                                {reportContent && (
                                    <>
                                        <textarea
                                            value={reportContent}
                                            readOnly
                                            rows="10"
                                            className="w-full border border-gray-300 rounded-md p-4 mb-4"
                                        />
                                        <button
                                            className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800"
                                            onClick={sendReport}
                                        >
                                            Send Report
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageKundaliM;
