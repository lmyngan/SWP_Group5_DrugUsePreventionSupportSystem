import "../styles/HomePage.css"
import MainContent from "../components/MainConent.js";
import { useState, useEffect } from "react";
import "../styles/WhoWeAre.css"


const HomePage = ({ navigateTo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  useEffect(() => {
    const msg = localStorage.getItem('loginMessage');
    if (msg) {
      setModalMessage(msg);
      setModalOpen(true);
      localStorage.removeItem('loginMessage');
    }
  }, []);

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => setModalOpen(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [modalOpen]);

  return (
    <div className="homepage">
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs flex flex-col items-center border-2 border-green-400 animate-fade-in">
            <div className="mb-2 text-center text-green-600 font-semibold text-lg">{modalMessage}</div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Journey to Recovery Starts Here</h1>
          <p>
            Empowering individuals and families with knowledge, support, and hope in the fight against drug addiction.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Get Help Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/drugs.webp" alt="Recovery Support" />
        </div>
      </section>
      
      {/* Quick Overview Section */}
      <section className="overview-section">
        <MainContent/>
        <div className="container">
          <h2>What We Offer</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-icon">👥</div>
              <h3>Who We Are</h3>
              <p>Learn about our mission and the people behind DrugsCare.</p>
              <a href="/whoweare" className="overview-link">
                Learn More
              </a>
            </div>
            <div className="overview-card">
              <div className="overview-icon">📋</div>
              <h3>Assessment Tests</h3>
              <p>Take ASSIST and CRAFFT surveys to determine risk levels and receive appropriate counseling</p>
              <a href="/survey" className="overview-link">
                Start Learning
              </a>

            </div>
            <div className="overview-card">
              <div className="overview-icon">🩺</div>
              <h3>Expert Mentors</h3>
              <p>Connect with our professional mentors and specialists.</p>
              <a href="/mentor" className="overview-link">
                Meet Experts
              </a>
            </div>
            <div className="overview-card">
              <div className="overview-icon">✍️</div>
              <h3>Community Event</h3>
              <p>Read and share real recovery stories and experiences.</p>
              <a href="/event" className="overview-link">
                Read Stories
              </a>
            </div>
          </div>
        </div>
      </section>

      
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Recovery Journey?</h2>
          <p>Don't wait another day. Take the first step towards a healthier, drug-free life.</p>
          <div className="cta-buttons">
            <button className="btn-primary">Get Support Now</button>
            <button className="btn-outline">Call Our Hotline</button>
          </div>
        </div>
      </section>
       
    </div>
  )
}

export default HomePage
