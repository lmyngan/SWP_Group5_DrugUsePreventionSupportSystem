import { useState, useEffect } from "react";
import { getConsultantSchedules, bookAppointment, createVNPayUrl, handleVNPayCallback, addNotification, getDataConsultant } from "../service/api";
import "../styles/MentorPage.css";
import Footer from "../components/Footer";

const Mentor = () => {
  const [selectedSchedules, setSelectedSchedules] = useState({});
  const [selectedScheduleId, setSelectedScheduleId] = useState({});
  const [bookingMessages, setBookingMessages] = useState({});
  const [loadingSchedules, setLoadingSchedules] = useState({});
  const [scheduleErrors, setScheduleErrors] = useState({});
  const [qrUrl, setQrUrl] = useState(null);
  const [paymentStatuses, setPaymentStatuses] = useState({});
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);

  const handleScheduleClick = async (consultantId) => {
    try {
      setLoadingSchedules(prev => ({ ...prev, [consultantId]: true }));
      setScheduleErrors(prev => ({ ...prev, [consultantId]: null }));

      console.log('Fetching schedules for consultant:', consultantId);
      const data = await getConsultantSchedules(consultantId);
      console.log('ConsultantId:', consultantId, 'Schedules data:', data);

      if (data.error) {
        setScheduleErrors(prev => ({ ...prev, [consultantId]: data.error }));
        setSelectedSchedules(prev => ({ ...prev, [consultantId]: [] }));
      } else {
        let schedules = [];
        if (Array.isArray(data)) {
          schedules = data;
        } else if (data && Array.isArray(data.schedules)) {
          schedules = data.schedules;
        } else if (data && Array.isArray(data.data)) {
          schedules = data.data;
        } else if (data && typeof data === 'object') {
          schedules = [data];
        }

        console.log('ConsultantId:', consultantId, 'Processed schedules:', schedules);
        setSelectedSchedules(prev => ({ ...prev, [consultantId]: schedules }));
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setScheduleErrors(prev => ({ ...prev, [consultantId]: error.message || 'Unknown error' }));
      setSelectedSchedules(prev => ({ ...prev, [consultantId]: [] }));
    } finally {
      setLoadingSchedules(prev => ({ ...prev, [consultantId]: false }));
    }
  };

  const handleSelectChange = (consultantId, scheduleId) => {
    setSelectedScheduleId((prev) => ({
      ...prev,
      [consultantId]: scheduleId
    }));
  };

  const formatScheduleDisplay = (schedule) => {
    let dateStr = "";
    if (schedule.availableDate) {
      const date = new Date(schedule.availableDate);
      dateStr = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } else if (schedule.dateTime) {
      const date = new Date(schedule.dateTime);
      dateStr = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    let timeStr = "";
    if (schedule.startTime && schedule.endTime) {
      timeStr = `${schedule.startTime} - ${schedule.endTime}`;
    } else if (schedule.time) {
      timeStr = schedule.time;
    } else if (schedule.startTime) {
      timeStr = schedule.startTime;
    }

    return `${timeStr}, ${dateStr}`.trim();
  };

  const handleBookConsultant = async (expert) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.accountId) {
      setBookingMessages(prev => ({
        ...prev,
        [expert.id]: "You must login to book a consultant."
      }));
      return;
    }
    const consultantId = expert.id;
    const scheduleId = selectedScheduleId[consultantId];
    const schedules = selectedSchedules[consultantId] || [];
    const schedule = schedules.find(s => (s.id || s.scheduleId) === scheduleId || String(s.id || s.scheduleId) === String(scheduleId));
    if (!schedule) {
      setBookingMessages(prev => ({
        ...prev,
        [consultantId]: "Please select a schedule."
      }));
      return;
    }

    const payload = {
      accountId: user.accountId,
      consultantId: consultantId,
      scheduleId: schedule.id || schedule.scheduleId,
      price: expert.price ? expert.price.replace(/\D/g, "") : "0", // Lấy số từ "$100"
      startTime: schedule.startTime || schedule.time || schedule.dateTime || "",
      endTime: schedule.endTime || "",
      status: "pending",
      notes: "",
      createdAt: new Date().toISOString()
    };

    const response = await bookAppointment(payload);
    if (response && response.appointmentId) {
      setCurrentAppointmentId(response.appointmentId);

      const notificationData = {
        accountId: user.accountId,
        message: `Your appointment with consultant ${consultantId} has been successfully booked.`
      };

      try {
        await addNotification(notificationData);
      } catch (error) {
        console.error('Failed to send notification:', error);
      }

      setSelectedSchedules(prev => ({
        ...prev,
        [consultantId]: (prev[consultantId] || []).filter(s => (s.id || s.scheduleId) !== (schedule.id || schedule.scheduleId))
      }));

      const vnpayRes = await createVNPayUrl(response.appointmentId);
      if (vnpayRes && vnpayRes.paymentUrl) {
        setQrUrl(vnpayRes.paymentUrl);
        setPaymentStatuses(prev => ({
          ...prev,
          [consultantId]: 'pending'
        }));
        setBookingMessages(prev => ({
          ...prev,
          [consultantId]: "Booking successful! Please proceed to payment."
        }));
      } else {
        setQrUrl(null);
        setPaymentStatuses(prev => ({
          ...prev,
          [consultantId]: 'fail'
        }));
        setBookingMessages(prev => ({
          ...prev,
          [consultantId]: "Booking succeeded but failed to get payment URL."
        }));
      }
    } else {
      setQrUrl(null);
      setPaymentStatuses(prev => ({
        ...prev,
        [consultantId]: 'fail'
      }));
      setBookingMessages(prev => ({
        ...prev,
        [consultantId]: "Booking failed. Please try again."
      }));
    }
  };

  // Hàm giả lập xác nhận đã thanh toán (gọi handleVNPayCallback)
  const handleConfirmPayment = async (consultantId) => {
    if (!currentAppointmentId) return;

    // Giả lập callback, thực tế cần truyền params đúng từ VNPay
    const callbackRes = await handleVNPayCallback({ appointmentId: currentAppointmentId });
    if (callbackRes && callbackRes.message && callbackRes.message.includes('thành công')) {
      setPaymentStatuses(prev => ({
        ...prev,
        [consultantId]: 'success'
      }));
    } else {
      setPaymentStatuses(prev => ({
        ...prev,
        [consultantId]: 'fail'
      }));
    }
  };

  const getAvailableSchedules = (expertId) => {
    return (selectedSchedules[expertId] || [])
      .filter(schedule => schedule.status === 'unbooked')
      .sort((a, b) => {

        const dateA = new Date(a.availableDate || a.dateTime || 0);
        const dateB = new Date(b.availableDate || b.dateTime || 0);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB;
        }

        const parseTime = t => {
          if (!t) return 0;
          if (typeof t === 'string') {
            const [h, m, s] = t.split(":").map(Number);
            return h * 3600 + m * 60 + (s || 0);
          }

          if (typeof t === 'object' && t.hours !== undefined) {
            return t.hours * 3600 + t.minutes * 60 + (t.seconds || 0);
          }
          return 0;
        };
        return parseTime(a.startTime) - parseTime(b.startTime);
      });
  };

  const [experts, setExperts] = useState([]);

  const imageMap = {
    1: "/images/consultant1.webp",
    2: "/images/consultant2.jpg",
    3: "/images/consultant4.jpg",
  };

  useEffect(() => {
    getDataConsultant().then(data => {
      if (Array.isArray(data)) {
        const mapped = data.map(consultant => ({
          ...consultant,
          id: consultant.consultantId,
          image: imageMap[consultant.consultantId]
        }));
        setExperts(mapped);
      }
    });
  });

  return (
    <div className="mentor-page">
      <section className="page-header">
        <div className="container">
          <h1>Meet Our Expert Consultants</h1>
          <p>Our team of experienced professionals is here to guide and support you on your journey to recovery</p>
        </div>
      </section>

      <section className="experts-section">
        <div className="container">
          <div className="experts-grid">
            {experts.map((expert) => (
              <div key={expert.consultantId} className="expert-card">
                <div className="expert-image">
                  <img src={expert.image || "/placeholder.svg"} alt={expert.name} />
                </div>
                <div className="expert-info">
                  <div className="expert-details">
                    <div className="detail-item">
                      <h3>{expert.fullName}</h3>
                    </div>
                    <div className="detail-item">
                      <strong>Gender:</strong> {expert.gender}
                    </div>
                    <div className="detail-item">
                      <strong>Certificate:</strong> {expert.certificate}
                    </div>
                    <div className="detail-item">
                      <strong>Additional certificate:</strong> {Array.isArray(expert.certificateNames) ? expert.certificateNames.join(", ") : ""}
                    </div>
                    <div className="detail-item">
                      <strong>Price:</strong> ${expert.price}
                    </div>
                  </div>

                  <div className="expert-actions">
                    <button
                      className="contact-btn"
                      onClick={() => handleScheduleClick(expert.consultantId)}
                      disabled={loadingSchedules[expert.consultantId]}
                    >
                      {loadingSchedules[expert.consultantId] ? "Loading..." : "Schedule Consultation"}
                    </button>
                  </div>

                  {loadingSchedules[expert.consultantId] && (
                    <div style={{ marginTop: "1rem", textAlign: "center", color: "#666" }}>
                      Loading schedules...
                    </div>
                  )}

                  {scheduleErrors[expert.consultantId] && (
                    <div style={{
                      marginTop: "1rem",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      backgroundColor: "#f8d7da",
                      border: "1px solid #f5c6cb",
                      color: "#721c24"
                    }}>
                      Error: You do not have permission to view consultation schedule.
                    </div>
                  )}

                  {selectedSchedules[expert.consultantId] && Array.isArray(selectedSchedules[expert.consultantId]) && selectedSchedules[expert.consultantId].length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                      <label><strong>Available Schedules ({getAvailableSchedules(expert.consultantId).length}):</strong></label>
                      <select
                        value={selectedScheduleId[expert.consultantId] || ""}
                        onChange={e => handleSelectChange(expert.consultantId, e.target.value)}
                        style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem" }}
                      >
                        <option value="">-- Select schedule --</option>
                        {getAvailableSchedules(expert.consultantId).map((schedule, idx) => (
                          <option key={schedule.consultantId || schedule.scheduleId || idx} value={schedule.id || schedule.scheduleId || idx}>
                            {formatScheduleDisplay(schedule)}
                          </option>
                        ))}
                      </select>
                      <button
                        className="contact-btn"
                        style={{ marginTop: "1rem", width: "100%" }}
                        onClick={() => handleBookConsultant(expert)}
                      >
                        Book Consultant
                      </button>
                    </div>
                  )}

                  {/* No schedules available */}
                  {selectedSchedules[expert.id] && Array.isArray(selectedSchedules[expert.id]) && selectedSchedules[expert.id].length === 0 && !loadingSchedules[expert.id] && !scheduleErrors[expert.id] && (
                    <div style={{
                      marginTop: "1rem",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      backgroundColor: "#fff3cd",
                      border: "1px solid #ffeaa7",
                      color: "#856404"
                    }}>
                      No schedules available for this consultant.
                    </div>
                  )}
                  {/* Thông báo booking */}
                  {bookingMessages[expert.id] && (
                    <div style={{
                      color: bookingMessages[expert.id].includes("success") ? "green" : "red",
                      marginTop: "1rem",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      backgroundColor: bookingMessages[expert.id].includes("success") ? "#d4edda" : "#f8d7da",
                      border: `1px solid ${bookingMessages[expert.id].includes("success") ? "#c3e6cb" : "#f5c6cb"}`
                    }}>
                      {bookingMessages[expert.id]}
                    </div>
                  )}
                  {qrUrl && paymentStatuses[expert.id] === 'pending' && (
                    <div style={{ marginTop: 16, textAlign: 'center' }}>
                      <h3>Scan QR code to pay</h3>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`} alt="VNPay QR" />
                      <p>Please scan the QR code with your banking app to pay.</p>
                      <button className="contact-btn" style={{ marginTop: 12 }} onClick={() => handleConfirmPayment(expert.id)}>I paid</button>
                    </div>
                  )}
                  {paymentStatuses[expert.id] === 'success' && (
                    <div style={{ color: 'green', fontWeight: 'bold', marginTop: 16 }}>Payment successful!</div>
                  )}
                  {paymentStatuses[expert.id] === 'fail' && (
                    <div style={{ color: 'red', fontWeight: 'bold', marginTop: 16 }}>Payment failed!</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How Our Consultant Works</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Choose Your Consultant</h3>
              <p>Browse our expert profiles and select the mentor that best fits your needs</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Schedule Consultation</h3>
              <p>Book a free initial consultation to discuss your goals and challenges</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Start Your Journey</h3>
              <p>Begin working with your mentor on a personalized recovery plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Mentor;
