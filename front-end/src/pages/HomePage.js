import "../styles/HomePage.css"
import Footer from "../components/Footer"

const HomePage = () => {
  const features = [
    {
      icon: "📋",
      title: "Risk Assessment Tools",
      description:
        "Take ASSIST and CRAFFT assessments to understand your risk level and receive personalized recommendations for next steps.",
    },
    {
      icon: "👨‍⚕️",
      title: "Expert Mentorship",
      description:
        "Connect with certified addiction specialists, counselors, and recovery coaches for professional guidance and support.",
    },
    {
      icon: "🏘️",
      title: "Community Events",
      description:
        "Join workshops, awareness campaigns, and support groups in your area. Participate in community-driven prevention programs.",
    },
    {
      icon: "💬",
      title: "Knowledge Sharing",
      description:
        "Read real recovery stories, expert insights, and practical tips. Share your own experiences to help others on their journey.",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Monitor your learning progress, track course completions, and manage your appointments with mentors and counselors.",
    },
  ]

  const services = [
    {
      emoji: "🧑‍🎓",
      title: "Students & Youth",
      description: "Learn how to recognize drug risks, resist peer pressure, and make healthy choices for your future.",
      bgColor: "service-card-blue",
    },
    {
      emoji: "👨‍👩‍👧‍👦",
      title: "Parents & Families",
      description:
        "Get tools to talk with your children about drugs, recognize warning signs, and create a supportive home environment.",
      bgColor: "service-card-green",
    },
    {
      emoji: "🧑‍🏫",
      title: "Educators & Counselors",
      description:
        "Access curriculum resources, training materials, and tools to implement effective prevention programs in schools.",
      bgColor: "service-card-purple",
    },
    {
      emoji: "🧑‍⚕️",
      title: "Healthcare Professionals",
      description:
        "Find evidence-based resources, screening tools, and referral networks to support patients and communities.",
      bgColor: "service-card-red",
    },
  ]



  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Building Stronger Communities Through Drug Prevention</h1>
              <p>
                DrugsCare is your comprehensive platform for drug prevention education, professional support, and
                community connection. Whether you're a student, parent, educator, or healthcare professional, we provide
                the tools and knowledge you need to make a positive impact in the fight against substance abuse.
              </p>
              <div className="hero-buttons">
                <a href="/survey" className="btn-primary">
                  Start Free Assessment
                </a>
                <a href="/mentor" className="btn-secondary">
                  Find a Mentor
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/matuy-homepage.jpg" alt="Community Support" />
            </div>
          </div>
        </div>
      </section>

     

      {/* Why Prevention Matters */}
      <section className="prevention-section">
        <div className="container">
          <div className="prevention-content">
            <div className="prevention-text">
              <h2>Why Drug Prevention Education Matters</h2>
              <p>
                Substance abuse affects millions of individuals and families worldwide, creating lasting impacts on
                health, relationships, and communities. Research shows that{" "}
                <strong>prevention programs can reduce drug use by up to 50%</strong>
                when implemented effectively with proper education and community support.
              </p>
              <p>
                However, many people don't know where to find reliable information, how to start difficult
                conversations, or when to seek professional help. Teachers need curriculum resources, parents need
                communication strategies, and young people need life skills to navigate peer pressure and make healthy
                choices.
              </p>
              <div className="prevention-highlight">
                <span className="highlight-icon">💡</span>
                <span>
                  DrugsCare bridges this gap by providing evidence-based resources, expert guidance, and a supportive
                  community for everyone committed to prevention.
                </span>
              </div>
            </div>
            <div className="prevention-image">
              <img src="/images/matuy.webp" alt="Prevention Education" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Comprehensive Prevention Resources</h2>
            <p>Everything you need for effective drug prevention education and community support</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="serve-section">
        <div className="container">
          <div className="section-header">
            <h2>Supporting Every Role in Prevention</h2>
            <p>Tailored resources and support for everyone working to prevent substance abuse in their communities</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className={`service-card ${service.bgColor}`}>
                <div className="service-emoji">{service.emoji}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access-section">
        <div className="container">
          <h2>Get Started Today</h2>

          <div className="quick-access-grid">
            <div className="access-card">
              <div className="access-icon">👨‍⚕️</div>
              <h3>Expert Mentors</h3>
              <p>
                Connect with certified addiction specialists, counselors, and prevention experts for personalized
                guidance.
              </p>
              <a href="/mentor" className="access-link">
                Meet Our Experts →
              </a>
            </div>
            <div className="access-card">
              <div className="access-icon">💬</div>
              <h3>Community Event</h3>
              <p>Read inspiring recovery stories, expert insights, and practical prevention tips from our community.</p>
              <a href="/event" className="access-link">
                Read Stories →
              </a>
            </div>
            <div className="access-card">
              <div className="access-icon">📅</div>
              <h3>Events & Workshops</h3>
              <p>Join virtual and in-person events, workshops, and community awareness campaigns near you.</p>
              <a href="/event" className="access-link">
                View Upcoming Events →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <h2>Real Impact, Real Stories</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The prevention courses helped me have meaningful conversations with my teenage daughter about drugs.
                  The resources are practical, evidence-based, and easy to understand."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩</div>
                <div className="author-info">
                  <div className="author-name">Maria S.</div>
                  <div className="author-role">Parent & Community Volunteer</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "As a high school counselor, I use DrugsCare's curriculum resources regularly. The materials are
                  age-appropriate and have significantly improved our prevention programs."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🏫</div>
                <div className="author-info">
                  <div className="author-name">David R.</div>
                  <div className="author-role">School Counselor</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The mentorship program connected me with an addiction specialist who provided invaluable guidance
                  during a difficult time. The support made all the difference."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👤</div>
                <div className="author-info">
                  <div className="author-name">Jennifer L.</div>
                  <div className="author-role">Healthcare Professional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join the Prevention Movement</h2>
            <p>
              Whether you're seeking education, professional development, or community support, DrugsCare provides the
              resources and connections you need. Together, we can build stronger, healthier communities through
              effective prevention education.
            </p>
            <div className="cta-buttons">
              <a href="/login" className="btn-primary">
                Create Free Account
              </a>
              <a href="/whoweare" className="btn-outline">
                Learn About Our Mission
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage
