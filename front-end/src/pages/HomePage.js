import React from 'react';
import "./HomePage.css"
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section - Chỉ giữ phần chính */}
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
          <img src="/placeholder.svg?height=400&width=600" alt="Recovery Support" />
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="overview-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-icon">👥</div>
              <h3>Who We Are</h3>
              <p>Learn about our mission and the people behind DrugsCare.</p>
              <Link to="/who-we-are" className="overview-link">Learn More</Link>

             
            </div>
            <div className="overview-card">
              <div className="overview-icon">📚</div>
              <h3>Free Courses</h3>
              <p>Access our comprehensive drug education courses for free.</p>
              <a href="/freecourse" className="overview-link">Start Learning</a>
            </div>
            <div className="overview-card">
              <div className="overview-icon">🩺</div>
              <h3>Expert Mentors</h3>
              <p>Connect with our professional mentors and specialists.</p>
              <a href="/mentor" className="overview-link">Meet Experts</a>
            </div>
            <div className="overview-card">
              <div className="overview-icon">✍️</div>
              <h3>Community Blog</h3>
              <p>Read and share real recovery stories and experiences.</p>
              <a href="/blog" className="overview-link">Read Stories</a>
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
