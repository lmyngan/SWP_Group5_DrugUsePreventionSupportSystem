import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5187";

const BookAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.accountId) {
            setLoading(false);
            return;
        }

        const fetchAppointments = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/Appointment`
                );
                setAppointments(res.data);
            } catch (err) {
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Handler cho Đồng ý/Hủy (chỉ mock, bạn có thể gọi API cập nhật trạng thái ở đây)
    const handleUpdateStatus = async (appointmentId, status) => {
        // Ví dụ: gọi API cập nhật trạng thái ở đây
        // await axios.put(`${API_BASE_URL}/api/Appointment/${appointmentId}/status`, { status });
        setAppointments((prev) =>
            prev.map((a) =>
                a.appointmentId === appointmentId ? { ...a, status } : a
            )
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Member Appointments</h2>
            {loading ? (
                <div>Loading...</div>
            ) : appointments.length === 0 ? (
                <div>No appointments found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.map((a) => (
                        <div
                            key={a.appointmentId}
                            className="bg-white border rounded-lg shadow p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="font-semibold text-lg mb-2">
                                    {a.memberName || a.accountName || a.fullName}
                                </div>
                                <div className="mb-1">
                                    <strong>Date:</strong> {a.date ? a.date.split("T")[0] : ""}
                                </div>
                                <div className="mb-1">
                                    <strong>Start Time:</strong> {a.startTime}
                                </div>
                                <div className="mb-1">
                                    <strong>End Time:</strong> {a.endTime}
                                </div>
                                <div className="mb-1">
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={
                                            a.status === "accepted"
                                                ? "text-green-600"
                                                : a.status === "rejected"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                        }
                                    >
                                        {a.status}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <strong>Notes:</strong> {a.notes}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                    onClick={() => handleUpdateStatus(a.appointmentId, "accepted")}
                                    disabled={a.status === "accepted"}
                                >
                                    Đồng ý
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    onClick={() => handleUpdateStatus(a.appointmentId, "rejected")}
                                    disabled={a.status === "rejected"}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookAppointment;