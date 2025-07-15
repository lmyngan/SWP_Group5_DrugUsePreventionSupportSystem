import React from 'react';

const Report = () => {
    // Dữ liệu hardcode mẫu
    const appointments = [
        { id: 1, price: 100, status: 'completed' },
        { id: 2, price: 150, status: 'pending' },
        { id: 3, price: 200, status: 'completed' },
        { id: 4, price: 120, status: 'completed' },
    ];
    const eventParticipations = [
        { id: 1, status: 'joined' },
        { id: 2, status: 'joined' },
        { id: 3, status: 'pending' },
        { id: 4, status: 'joined' },
        { id: 5, status: 'cancelled' },
    ];

    // Tính toán
    const totalEarnings = appointments
        .filter(a => a.status === 'completed')
        .reduce((sum, a) => sum + a.price, 0);
    const totalJoined = eventParticipations.filter(e => e.status === 'joined').length;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Report Management</h2>
                <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total Book Appointment Earned:</div>
                    <div className="text-2xl text-green-600 font-bold">${totalEarnings.toLocaleString()}</div>
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">Total Event Participants:</div>
                    <div className="text-2xl text-blue-600 font-bold">{totalJoined} Members</div>
                </div>
            </div>
        </div>
    );
};

export default Report;