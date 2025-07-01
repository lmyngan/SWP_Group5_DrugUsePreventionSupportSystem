import "./Footer.css"

const Footer = () => {
  return (
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

          {/* Featured Articles */}
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
  )
}

export default Footer
