import { useEffect, useState } from "react";
import { getConsultantSchedules, updateAppointmentStatus } from "../service/api";

const BookAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.accountId) {
            setLoading(false);
            return;
        }

        const fetchAppointments = async () => {
            try {
                const response = await getConsultantSchedules(user.consultantId);
                if (response.error) {
                    console.error("Error fetching appointments:", response.error);
                    setAppointments([]);
                } else {
                    setAppointments(Array.isArray(response) ? response : [response]);
                }
            } catch (err) {
                console.error("Error fetching appointments:", err);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    // Handler cho Đồng ý/Hủy
    const handleUpdateStatus = async (appointmentId, status) => {
        setUpdatingId(appointmentId);

        try {
            const response = await updateAppointmentStatus(appointmentId, status);
            if (response.error) {
                console.error("Error updating appointment:", response.error);
                alert("Failed to update appointment status");
                return;
            }

            // Update only the specific appointment in the state
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.appointmentId === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
        } catch (err) {
            console.error("Error updating appointment:", err);
            alert("Failed to update appointment status");
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "text-green-600";
            case "canceled":
                return "text-red-600";
            case "pending":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
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
                                    <strong>Date:</strong> {a.availableDate ? a.availableDate.split("T")[0] : ""}
                                </div>
                                <div className="mb-1">
                                    <strong>Slot:</strong> {a.slot}
                                </div>
                                <div className="mb-1">
                                    <strong>Start Time:</strong> {a.startTime}
                                </div>
                                <div className="mb-1">
                                    <strong>End Time:</strong> {a.endTime}
                                </div>
                                <div className="mb-1">
                                    <strong>Status:</strong>{" "}
                                    <span className={getStatusColor(a.status)}>
                                        {a.status}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <strong>Notes:</strong> {a.notes}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                    onClick={() => handleUpdateStatus(a.appointmentId, "completed")}
                                    disabled={a.status === "completed" || updatingId === a.appointmentId}
                                >
                                    {updatingId === a.appointmentId ? "Updating..." : "Đồng ý"}
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                    onClick={() => handleUpdateStatus(a.appointmentId, "canceled")}
                                    disabled={a.status === "canceled" || updatingId === a.appointmentId}
                                >
                                    {updatingId === a.appointmentId ? "Updating..." : "Hủy"}
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