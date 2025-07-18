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


    const handleUpdateStatus = async (appointmentId, status) => {
        console.log("Starting update with:", { appointmentId, status });
        console.log("Appointment ID type:", typeof appointmentId);

        const numericId = parseInt(appointmentId);
        if (isNaN(numericId)) {
            alert("Invalid appointment ID");
            return;
        }

        setUpdatingId(appointmentId);

        try {
            console.log("Calling API with:", { numericId, status });
            const response = await updateAppointmentStatus(numericId, status);
            if (response.error) {
                console.error("Error updating appointment:", response.error);
                alert(`Failed to update appointment status: ${response.error}`);
                return;
            }

            console.log("Update successful:", response);

            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.appointmentId === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
        } catch (err) {
            console.error("Error updating appointment:", err);
            alert(`Failed to update appointment status: ${err.message}`);
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "text-green-600";
            case "cancelled":
                return "text-red-600";
            default:
                return "text-yellow-600";
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Member Appointments</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : appointments.length === 0 ? (
                    <div>No appointments found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments.map((a) => {
                            const statusColor =
                                a.status === "completed"
                                    ? "border-green-500 text-green-600 bg-green-50"
                                    : a.status === "cancelled"
                                        ? "border-red-500 text-red-600 bg-red-50"
                                        : a.status === "pending"
                                            ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                                            : "border-gray-400 text-gray-600 bg-gray-50";
                            return (
                                <div
                                    key={a.scheduleId || a.appointmentId}
                                    className="bg-white border rounded-lg shadow p-6 flex flex-col justify-between"
                                >

                                    <div className={`mb-2 border-none px-3 py-1 font-semibold ${statusColor} rounded-xl w-1/2 text-left`}>
                                        {a.status}
                                    </div>
                                    <hr className="my-2" />

                                    <div className="mb-1">
                                        {a.memberName || a.accountName || a.fullName}
                                    </div>

                                    <div className="mb-1">
                                        <strong>Date:</strong> {a.availableDate ? a.availableDate.split("T")[0] : ""}
                                    </div>

                                    <div className="mb-1">
                                        <strong>Slot:</strong> {a.slot}
                                    </div>

                                    <div className="mb-1">
                                        <strong>Time:</strong> {a.startTime} - {a.endTime}
                                    </div>

                                    <div className="mb-2">
                                        <strong>Notes:</strong> {a.notes}
                                    </div>
                                    <hr className="my-2" />

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                            onClick={() => handleUpdateStatus(a.appointmentId, "completed")}
                                            disabled={a.status === "completed" || updatingId === (a.appointmentId)}
                                        >
                                            {updatingId === (a.appointmentId) ? "Updating..." : "Đồng ý"}
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                            onClick={() => handleUpdateStatus(a.appointmentId, "cancelled")}
                                            disabled={a.status === "cancelled" || updatingId === (a.appointmentId)}
                                        >
                                            {updatingId === (a.appointmentId) ? "Updating..." : "Hủy"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookAppointment;