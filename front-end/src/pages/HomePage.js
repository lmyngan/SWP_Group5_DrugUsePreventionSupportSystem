import "../styles/HomePage.css"
import Footer from "../components/Footer";

const HomePage = ({ navigateTo }) => {
  return (
    <div className="homepage">
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
          <img src="/images/matuy.webp" alt="Recovery Support" />
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

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Search content categorized by age groups: students, university students, parents, teachers</p>
            </div>
          
            <div
  className="feature-card"
  style={{ cursor: "pointer" }}
  onClick={() => navigateTo && navigateTo("calendar")}
>
  <div className="feature-icon">📅</div>
  <h3>Schedule Consultations</h3>
  <p>Book online appointments with professional counselors</p>
</div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Specialist Management</h3>
              <p>Specialist information management system: qualifications, expertise, work schedules</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Dashboard & Reports</h3>
              <p>Track progress, program participation history, and detailed reports</p>
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
       <Footer/>
    </div>
  )
}

export default HomePage
