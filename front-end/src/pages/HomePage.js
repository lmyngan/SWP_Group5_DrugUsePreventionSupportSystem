import useSurveyModal from "../hooks/useSurveyModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

const HomePage = () => {
  const { showModal, handleYes, handleCancel } = useSurveyModal();

  return (
    <div className="homepage">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white rounded-lg shadow-lg w-full max-w-md transition-all duration-300 transform animate-slideUp`}
          >
            <div className="px-6 py-4 border-b">
              <h5 className="text-xl font-semibold text-gray-800">Khảo sát nhanh</h5>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700">Bạn có muốn tham gia khảo sát không?</p>
            </div>
            <div className="px-6 py-4 flex justify-end gap-2 border-t">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleYes}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
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
            <button className="btn-primary">
              <a href="/survey">Get Help Now</a>
            </button>
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
              <a href="/whoweare" className="overview-link">
                Learn More
              </a>
            </div>
            <div className="overview-card">
              <div className="overview-icon">📋</div>
              <h3>Assessment Tests</h3>
              <p>Take ASSIST and CRAFFT surveys to determine risk levels and receive appropriate counseling</p>
              <a href="/freetest" className="overview-link">
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
              <h3>Community Blog</h3>
              <p>Read and share real recovery stories and experiences.</p>
              <a href="/blog" className="overview-link">
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
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Schedule Consultations</h3>
              <p>Book online appointments with professional counselors</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Education Programs</h3>
              <p>Participate in community outreach and education programs about drugs</p>
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

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            {/* About Section */}
            <div className="footer-section">
              <h3>ABOUT US</h3>
              <p>
                DrugsCare.com is a volunteer platform specializing in providing educational information about drug
                prevention and community support.
              </p>
              <p>
                We are committed to delivering scientific, reliable knowledge and effective support programs for all
                segments of society.
              </p>
              <p>Our mission is to build a healthy, safe community free from social evils.</p>
            </div>

            {/* Partners Section */}
            <div className="footer-section">
              <h3>PARTNERS & COOPERATION</h3>
              <ul className="footer-links">
                <li>
                  <a href="/">Ministry of Health</a>
                </li>
                <li>
                  <a href="/">Ministry of Education and Training</a>
                </li>
                <li>
                  <a href="/">Social Evils Prevention Center</a>
                </li>
                <li>
                  <a href="/">Vietnam Red Cross Society</a>
                </li>
                <li>
                  <a href="/">Medical and Pharmaceutical Universities</a>
                </li>
                <li>
                  <a href="/">World Health Organization (WHO)</a>
                </li>
              </ul>
            </div>

            {/* Random Articles */}
            <div className="footer-section">
              <h3>FEATURED ARTICLES</h3>
              <div className="random-articles">
                <article className="footer-article">
                  <h4>
                    <a href="/">How to Recognize Signs of Drug Use in Teenagers</a>
                  </h4>
                  <span className="article-date">📅 March 24, 2024</span>
                </article>
                <article className="footer-article">
                  <h4>
                    <a href="/">ASSIST Test - Tool for Assessing Substance Use Risk</a>
                  </h4>
                  <span className="article-date">📅 March 22, 2024</span>
                </article>
                <article className="footer-article">
                  <h4>
                    <a href="/">The Role of Family in Preventing Social Evils</a>
                  </h4>
                  <span className="article-date">📅 March 20, 2024</span>
                </article>
              </div>
            </div>

            {/* Blog Info */}
            <div className="footer-section">
              <h3>ABOUT DRUGSCARE</h3>
              <ul className="footer-info">
                <li>
                  <a href="/whoweare">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/privacy">Terms of Use</a>
                </li>
                <li>
                  <a href="/donate">Donate (Support)</a>
                </li>
                <li>
                  <a href="/advertising">Advertising Contact</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
              </ul>
              <div className="footer-badge">
                <img src="/placeholder.svg?height=40&width=120" alt="DMCA Protected" />
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2024 DrugsCare.com - Social Evils Prevention Platform. All rights reserved.</p>
              <div className="social-links">
                <a href="/" aria-label="Facebook">
                  📘
                </a>
                <a href="/" aria-label="YouTube">
                  📺
                </a>
                <a href="/" aria-label="Email">
                  📧
                </a>
                <a href="/" aria-label="Phone">
                  📞
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
