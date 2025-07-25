import { useEffect, useState } from "react";
import { getConsultantSchedules, updateAppointmentStatus, addNotification } from "../service/api";

const BookAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState("");
    const [messageTarget, setMessageTarget] = useState(null);
    const [modalFeedback, setModalFeedback] = useState("");
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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

    const handleUpdateStatus = async (scheduleId, status, appointment) => {
        if (status === "cancelled") {
            const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?");
            if (!confirmCancel) return;
        }
        console.log("Starting update with:", { scheduleId, status });
        console.log("Schedule ID type:", typeof scheduleId);

        const numericId = parseInt(scheduleId);
        if (isNaN(numericId)) {
            setModalFeedback("Invalid schedule ID");
            setShowFeedbackModal(true);
            return;
        }

        setUpdatingId(scheduleId);

        try {
            const response = await updateAppointmentStatus(scheduleId, status);
            if (response.error) {
                console.error("Error updating appointment:", response.error);
                setModalFeedback(`Failed to update appointment status: ${response.error}`);
                setShowFeedbackModal(true);
                return;
            }

            setAppointments((prev) =>
                prev.map((a) =>
                    a.scheduleId === scheduleId
                        ? { ...a, status }
                        : a
                )
            );

            let notificationMessage = "";
            if (status === "completed") {
                notificationMessage = `Your appointment on day ${appointment.availableDate ? appointment.availableDate.split("T")[0] : ""} has been completed.`;
            } else if (status === "cancelled") {
                notificationMessage = `Your appointment on day ${appointment.availableDate ? appointment.availableDate.split("T")[0] : ""} has been cancelled.`;
            }
            if (notificationMessage && appointment.accountId) {
                await addNotification({
                    accountId: appointment.accountId,
                    message: notificationMessage,
                });
            }
            setModalFeedback("Appointment status updated and notification sent.");
            setShowFeedbackModal(true);
        } catch (err) {
            console.error("Error updating appointment:", err);
            setModalFeedback(`Failed to update appointment status: ${err.message}`);
            setShowFeedbackModal(true);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleSendMessage = async () => {
        if (!messageContent.trim() || !messageTarget?.accountId) return;
        try {
            await addNotification({
                accountId: messageTarget.accountId,
                message: messageContent.trim(),
            });
            setShowMessageModal(false);
            setMessageContent("");
            setMessageTarget(null);
            setModalFeedback("Message sent successfully!");
            setShowFeedbackModal(true);
        } catch (err) {
            setModalFeedback("Failed to send message!");
            setShowFeedbackModal(true);
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

            {showMessageModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-2">Gửi tin nhắn cho người đặt lịch</h3>
                        <textarea
                            className="w-full border rounded p-2 mb-4"
                            rows={4}
                            value={messageContent}
                            onChange={e => setMessageContent(e.target.value)}
                            placeholder="Nhập nội dung tin nhắn..."
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => { setShowMessageModal(false); setMessageContent(""); setMessageTarget(null); }}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleSendMessage}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <div className="mb-4">{modalFeedback}</div>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setShowFeedbackModal(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Member Appointments</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : appointments.length === 0 ? (
                    <div>No appointments found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments
                            .filter((a) => a.status && a.status.trim() !== "unbooked")
                            .map((a) => {
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
                                        key={a.scheduleId}
                                        className="bg-white border rounded-lg shadow p-6 flex flex-col justify-between"
                                    >
                                        <div className="mb-1 text-lg font-bold">
                                            {a.fullName}
                                        </div>

                                        <div className={`mb-2 border-none px-3 py-1 font-semibold ${statusColor} rounded-xl w-1/2 text-left`}>
                                            {a.status}
                                        </div>
                                        <hr className="my-2" />

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
                                                onClick={() => handleUpdateStatus(a.scheduleId, "completed", a)}
                                                disabled={a.status === "completed" || a.status === "cancelled" || updatingId === (a.scheduleId)}
                                            >
                                                {updatingId === (a.scheduleId) ? "Updating..." : "Accept"}
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                                onClick={() => handleUpdateStatus(a.scheduleId, "cancelled", a)}
                                                disabled={a.status === "cancelled" || a.status === "completed" || updatingId === (a.scheduleId)}
                                            >
                                                {updatingId === (a.scheduleId) ? "Updating..." : "Cancel"}
                                            </button>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                                onClick={handleSendMessage}
                                            >
                                                Send Message
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