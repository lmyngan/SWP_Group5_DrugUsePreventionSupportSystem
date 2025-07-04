import { useState } from "react";
import { getConsultantSchedules, bookAppointment } from "../service/api";
import "../styles/MentorPage.css";
import Footer from "../components/Footer";

const Mentor = () => {
  const [selectedSchedules, setSelectedSchedules] = useState({});
  const [selectedScheduleId, setSelectedScheduleId] = useState({});
  const [bookingMessage, setBookingMessage] = useState("");

  const handleScheduleClick = async (consultantId) => {
    const data = await getConsultantSchedules(consultantId);
    setSelectedSchedules((prev) => ({
      ...prev,
      [consultantId]: data
    }));
  };

  const handleSelectChange = (consultantId, scheduleId) => {
    setSelectedScheduleId((prev) => ({
      ...prev,
      [consultantId]: scheduleId
    }));
  };

  const formatScheduleDisplay = (schedule) => {
    // Format date
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

    // Format time
    let timeStr = "";
    if (schedule.startTime && schedule.endTime) {
      timeStr = `${schedule.startTime} - ${schedule.endTime}`;
    } else if (schedule.time) {
      timeStr = schedule.time;
    } else if (schedule.startTime) {
      timeStr = schedule.startTime;
    }

    return `${dateStr} ${timeStr}`.trim();
  };

  const handleBookConsultant = async (expert) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.accountId) {
      setBookingMessage("You must login to book a consultant.");
      return;
    }
    const consultantId = expert.id;
    const scheduleId = selectedScheduleId[consultantId];
    const schedules = selectedSchedules[consultantId] || [];
    const schedule = schedules.find(s => (s.id || s.scheduleId) === scheduleId || String(s.id || s.scheduleId) === String(scheduleId));
    if (!schedule) {
      setBookingMessage("Please select a schedule.");
      return;
    }

    // Lấy các trường cần thiết từ schedule
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
    if (response.error) {
      setBookingMessage("Booking failed: " + response.error);
    } else {
      setBookingMessage("Booking successful!");
    }
  };

  const experts = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      title: "Addiction Specialist",
      image: "/images/consultant1.webp",
      description: "Dr. Jane Smith has over 15 years of experience in addiction medicine and has helped thousands of patients recover.",
      specialties: ["Substance Abuse", "Mental Health", "Recovery Programs"],
      experience: "15+ years",
      education: "MD from Harvard Medical School",
      price: "$100",
      contact: "jane_smith.johnson@drugscare.com",
    },
    {
      id: 2,
      name: "Dr. Emma Jones",
      title: "Behavioral Therapist",
      image: "/images/consultant2.jpg",
      description: "Specializing in cognitive behavioral therapy for addiction recovery and prevention programs.",
      specialties: ["CBT Therapy", "Group Counseling", "Prevention"],
      experience: "12+ years",
      education: "PhD in Psychology from Stanford",
      price: "$150",
      contact: "emma_jones.chen@drugscare.com",
    },
  ];

  return (
    <div className="mentor-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Meet Our Expert Consultants</h1>
          <p>Our team of experienced professionals is here to guide and support you on your journey to recovery</p>
        </div>
      </section>

      {/* Experts Section */}
      <section className="experts-section">
        <div className="container">
          <div className="experts-grid">
            {experts.map((expert) => (
              <div key={expert.id} className="expert-card">
                <div className="expert-image">
                  <img src={expert.image || "/placeholder.svg"} alt={expert.name} />
                </div>
                <div className="expert-info">
                  <h3>{expert.name}</h3>
                  <h4>{expert.title}</h4>
                  <p>{expert.description}</p>
                  <div className="expert-details">
                    <div className="detail-item">
                      <strong>Experience:</strong> {expert.experience}
                    </div>
                    <div className="detail-item">
                      <strong>Education:</strong> {expert.education}
                    </div>
                    <div className="detail-item">
                      <strong>Price:</strong> {expert.price}
                    </div>
                  </div>
                  <div className="specialties">
                    <strong>Specialties:</strong>
                    {expert.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="expert-actions">
                    <button
                      className="contact-btn"
                      onClick={() => handleScheduleClick(expert.id)}
                    >
                      Schedule Consultation
                    </button>
                  </div>
                  {/* Hiển thị lịch nếu đã lấy */}
                  {selectedSchedules[expert.id] && Array.isArray(selectedSchedules[expert.id]) && (
                    <div style={{ marginTop: "1rem" }}>
                      <label><strong>Available Schedules:</strong></label>
                      <select
                        value={selectedScheduleId[expert.id] || ""}
                        onChange={e => handleSelectChange(expert.id, e.target.value)}
                        style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem" }}
                      >
                        <option value="">-- Select schedule --</option>
                        {selectedSchedules[expert.id].map((schedule, idx) => (
                          <option key={schedule.id || schedule.scheduleId || idx} value={schedule.id || schedule.scheduleId || idx}>
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
                  {/* Thông báo booking */}
                  {bookingMessage && (
                    <div style={{
                      color: bookingMessage.includes("success") ? "green" : "red",
                      marginTop: "1rem",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      backgroundColor: bookingMessage.includes("success") ? "#d4edda" : "#f8d7da",
                      border: `1px solid ${bookingMessage.includes("success") ? "#c3e6cb" : "#f5c6cb"}`
                    }}>
                      {bookingMessage}
                    </div>
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
