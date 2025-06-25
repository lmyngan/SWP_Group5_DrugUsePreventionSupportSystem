import { useState } from "react";
import { getConsultantSchedules } from "../service/api";
import "../styles/MentorPage.css";
import Footer from "../components/Footer";

const Mentor = () => {
  const [selectedSchedules, setSelectedSchedules] = useState({});

  const handleScheduleClick = async (consultantId) => {
    const data = await getConsultantSchedules(consultantId);
    // Giả sử data là mảng các lịch, ví dụ: [{id: 1, time: "2024-07-01 09:00"}, ...]
    setSelectedSchedules((prev) => ({
      ...prev,
      [consultantId]: data
    }));
  };

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Addiction Specialist",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Dr. Johnson has over 15 years of experience in addiction medicine and has helped thousands of patients recover.",
      specialties: ["Substance Abuse", "Mental Health", "Recovery Programs"],
      experience: "15+ years",
      education: "MD from Harvard Medical School",
      price: "$100",
      contact: "sarah.johnson@drugscare.com",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Behavioral Therapist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Specializing in cognitive behavioral therapy for addiction recovery and prevention programs.",
      specialties: ["CBT Therapy", "Group Counseling", "Prevention"],
      experience: "12+ years",
      education: "PhD in Psychology from Stanford",
      price: "$150",
      contact: "michael.chen@drugscare.com",
    },
  ];

  return (
    <div className="mentor-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Meet Our Expert Mentors</h1>
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
                    <a href={`mailto:${expert.contact}`} className="email-btn">
                      Send Email
                    </a>
                  </div>
                  {/* Hiển thị lịch nếu đã lấy */}
                  {selectedSchedules[expert.id] && Array.isArray(selectedSchedules[expert.id]) && (
                    <div style={{ marginTop: "1rem" }}>
                      <label><strong>Available Schedules:</strong></label>
                      <select>
                        {selectedSchedules[expert.id].map((schedule, idx) => (
                          <option key={schedule.id || idx} value={schedule.id || idx}>
                            {JSON.stringify(schedule)}
                          </option>
                        ))}
                      </select>
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
          <h2>How Our Mentorship Works</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Choose Your Mentor</h3>
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
