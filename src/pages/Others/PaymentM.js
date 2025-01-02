//Payment Management 

import React, { useState } from 'react';

const PaymentDashboard = () => {
    const [view, setView] = useState(null);

    const transactionsData = [
        { id: 1, type: 'Booking', amount: '$200', date: '2024-01-01' },
        { id: 2, type: 'Consultation', amount: '$150', date: '2024-01-02' },
        { id: 3, type: 'Product Sale', amount: '$50', date: '2024-01-03' },
    ];

    const refundRequestsData = [
        { id: 1, customer: 'John Doe', amount: '$50', reason: 'Damaged item' },
        { id: 2, customer: 'Jane Smith', amount: '$100', reason: 'Service not satisfactory' },
    ];

    const reportsData = {
        totalRevenue: '$10,000',
        totalTransactions: 200,
        refundsProcessed: 15,
    };

    const handleViewTransactions = () => {
        setView('transactions');
    };

    const handleRefundRequests = () => {
        setView('refunds');
    };

    const handleGenerateReports = () => {
        setView('reports');
    };

    return (
        <div className="bg-teal-50 min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-black mb-4">Payment Dashboard</h2>

                <div className="mb-6">
                    <button 
                        className="w-full bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-00"
                        onClick={handleViewTransactions}
                    >
                        View and Manage Transactions
                    </button>
                </div>

                <div className="mb-6">
                    <button 
                        className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
                        onClick={handleRefundRequests}
                    >
                        Handle Refund Requests and Payment Disputes
                    </button>
                </div>

                <div className="mb-6">
                    <button 
                        className="w-full bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500"
                        onClick={handleGenerateReports}
                    >
                        Generate Payment and Revenue Reports
                    </button>
                </div>

                <div className="bg-teal-100 p-4 rounded-lg shadow-inner">
                    {view === 'transactions' && (
                        <div>
                            <h3 className="text-xl font-semibold text-teal-800 mb-2">Transactions</h3>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-2">ID</th>
                                        <th className="border-b py-2">Type</th>
                                        <th className="border-b py-2">Amount</th>
                                        <th className="border-b py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionsData.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td className="border-b py-2">{transaction.id}</td>
                                            <td className="border-b py-2">{transaction.type}</td>
                                            <td className="border-b py-2">{transaction.amount}</td>
                                            <td className="border-b py-2">{transaction.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {view === 'refunds' && (
                        <div>
                            <h3 className="text-xl font-semibold text-teal-800 mb-2">Refund Requests</h3>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-2">ID</th>
                                        <th className="border-b py-2">Customer</th>
                                        <th className="border-b py-2">Amount</th>
                                        <th className="border-b py-2">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {refundRequestsData.map(refund => (
                                        <tr key={refund.id}>
                                            <td className="border-b py-2">{refund.id}</td>
                                            <td className="border-b py-2">{refund.customer}</td>
                                            <td className="border-b py-2">{refund.amount}</td>
                                            <td className="border-b py-2">{refund.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {view === 'reports' && (
                        <div>
                            <h3 className="text-xl font-semibold text-teal-800 mb-2">Payment and Revenue Reports</h3>
                            <ul className="list-disc pl-4">
                                <li>Total Revenue: {reportsData.totalRevenue}</li>
                                <li>Total Transactions: {reportsData.totalTransactions}</li>
                                <li>Refunds Processed: {reportsData.refundsProcessed}</li>
                            </ul>
                        </div>
                    )}

                    {!view && (
                        <p className="text-teal-700">Select an option above to view details.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentDashboard;
