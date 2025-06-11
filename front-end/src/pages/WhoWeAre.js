import React from 'react';
import { CheckCircle, Users, GraduationCap, Heart, ArrowRight, Mail, Shield, FileText, Home } from 'lucide-react';
import './WhoWeAre.css';

// Button Component
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>
    {children}
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>DC</span>
          </div>
          <div className="footer-info">
            <h3>DrugsCare</h3>
            <p>Drug Prevention & Recovery Support</p>
          </div>
        </div>
        <nav className="footer-nav">
          <a href="/" className="footer-link">
            <Home className="icon-sm" />
            HOME
          </a>
          <a href="#" className="footer-link">
            <Mail className="icon-sm" />
            CONTACTS
          </a>
          <a href="#" className="footer-link">
            <Shield className="icon-sm" />
            PRIVACY
          </a>
          <a href="#" className="footer-link">
            <FileText className="icon-sm" />
            LEGAL NOTICE
          </a>
        </nav>
      </div>
    </div>
  </footer>
);

// Feature Item Component
const FeatureItem = ({ title, description }) => (
  <div className="feature-item">
    <CheckCircle className="feature-icon" />
    <div className="feature-content">
      <h4 className="feature-title">{title}</h4>
      <p className="feature-description">{description}</p>
    </div>
  </div>
);

// Service Card Component
const ServiceCard = ({ emoji, title, description, bgColor = "service-card-blue" }) => (
  <div className={`service-card ${bgColor}`}>
    <div className="service-emoji">{emoji}</div>
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
  </div>
);

// Main WhoWeAre Component
const WhoWeAre = () => {
  const features = [
    {
      title: "Educational Courses",
      description: "Tailored by age group (students, parents, teachers) that teach about drug risks, refusal skills, and mental health."
    },
    {
      title: "Interactive Risk Assessments",
      description: "Using tools like ASSIST and CRAFFT, helping users understand their own risk level and what to do next."
    },
    {
      title: "Online Counseling Support",
      description: "Easily book appointments with licensed counselors who can offer advice, emotional support, and guidance."
    },
    {
      title: "Community Programs",
      description: "Manage and join awareness campaigns, educational workshops, and outreach events."
    },
    {
      title: "Blogs & Shared Experiences",
      description: "Read real-life stories, advice from experts, and tips for daily life."
    },
    {
      title: "User Profiles & Progress Tracking",
      description: "Keep a personal record of your learning, appointments, and growth."
    }
  ];

  const services = [
    {
      emoji: "🧑‍🎓",
      title: "Students",
      description: "From primary to university level – who want to learn how to stay safe and handle peer pressure.",
      bgColor: "service-card-blue"
    },
    {
      emoji: "👨‍👩‍👧‍👦",
      title: "Parents & Guardians",
      description: "Who want to understand more about drug prevention and support their children.",
      bgColor: "service-card-green"
    },
    {
      emoji: "🧑‍🏫",
      title: "Teachers & Counselors",
      description: "Who are looking for tools to integrate drug education into classrooms.",
      bgColor: "service-card-purple"
    },
    {
      emoji: "🧑‍⚕️",
      title: "Health & Social Workers",
      description: "Who want to track, advise, and connect with individuals at risk.",
      bgColor: "service-card-red"
    },
    {
      emoji: "🏘️",
      title: "Community Organizations",
      description: "Working to promote awareness and run outreach activities.",
      bgColor: "service-card-yellow"
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Who We Are</h1>
            <p className="hero-subtitle">
              We are building a community of prevention, one choice at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Introduction Section */}
        <section className="section">
          <Card className="intro-card">
            <CardContent>
              <h2 className="section-title">
                <Heart className="section-icon heart-icon" />
                Why Drug Prevention Matters
              </h2>
              <div className="prose">
                <p>
                  Every year, millions of young people and families are impacted by drug use, not only through addiction
                  but also through its emotional, social, and economic consequences. While treatment is important,{" "}
                  <strong>
                    early prevention has been proven to be one of the most effective ways to reduce the risk of drug
                    abuse
                  </strong>
                  . Prevention starts with awareness, education, and timely support.
                </p>
                <p>
                  However, the reality is that many people don't know where to start. They may feel overwhelmed,
                  ashamed, or unaware of the risks. Teachers may lack resources to guide students. Parents may not know
                  how to start a conversation. Students may not feel safe asking questions.
                </p>
                <p className="highlight-text">This is why Drug Prevention (DP) exists.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* About Us Section */}
        <section className="section">
          <Card className="about-card">
            <CardContent>
              <h2 className="section-title">
                <Users className="section-icon users-icon" />
                What We Do
              </h2>
              <div className="prose about-prose">
                <p>
                  Drug Prevention is an online support system that provides preventive education, interactive tools, and
                  professional guidance to help individuals, especially young people, stay safe and informed about the
                  risks of drug use.
                </p>
                <p>
                  <strong>We are not just a website. We are a community-driven initiative</strong>—designed to support
                  schools, families, and community organizations in their shared mission to prevent drug use and promote
                  mental well-being.
                </p>
              </div>

              <h3 className="subsection-title">Our Key Features:</h3>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <FeatureItem key={index} title={feature.title} description={feature.description} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision Section */}
        <section className="section">
          <Card className="vision-card">
            <CardContent>
              <h2 className="section-title">
                <GraduationCap className="section-icon graduation-icon" />
                Our Vision: What We Believe
              </h2>
              <div className="vision-grid">
                <div className="vision-column">
                  <p className="belief-item">
                    <span className="belief-emoji">🌟</span>
                    We believe that every person deserves the chance to grow up in a safe, informed, and supportive
                    environment.
                  </p>
                  <p className="belief-item">
                    <span className="belief-emoji">📚</span>
                    We believe that education is power—and when people understand the risks of drugs, recognize early
                    warning signs, and know where to go for help, they can make better choices.
                  </p>
                </div>
                <div className="vision-column">
                  <p className="belief-item">
                    <span className="belief-emoji">💻</span>
                    We believe that technology can bridge the gap—making prevention resources accessible to anyone,
                    anywhere, at any time.
                  </p>
                  <p className="belief-item">
                    <span className="belief-emoji">🤝</span>
                    We believe that community is the key—change happens not just through individuals, but when families,
                    schools, and organizations come together around a shared goal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Who We Serve Section */}
        <section className="section">
          <Card className="serve-card">
            <CardContent>
              <h2 className="section-title centered">Who We Serve</h2>
              <div className="services-grid">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    emoji={service.emoji}
                    title={service.title}
                    description={service.description}
                    bgColor={service.bgColor}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why This Matters Now */}
        <section className="section">
          <Card className="matters-card">
            <CardContent>
              <h2 className="section-title">Why This Matters Now</h2>
              <div className="prose">
                <p>
                  In today's world, drug risks are not always obvious. Substances are more accessible, peer influence is
                  amplified through social media, and many youths are facing mental health challenges that increase
                  vulnerability. <strong>Prevention is no longer a luxury—it's a necessity.</strong>
                </p>
                <p>
                  With the right tools, we can empower people to make safe, informed, and confident decisions. Whether
                  it's saying no at a party, talking to a friend in trouble, or seeking help from a professional—
                  <strong className="prevention-highlight">prevention saves lives.</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="section">
          <Card className="cta-card">
            <CardContent className="cta-content">
              <h2 className="cta-title">Join Us</h2>
              <p className="cta-subtitle">
                Whether you're here to learn, to teach, to help others, or to find help for yourself—you are not alone.
              </p>
              <p className="cta-description">
                Join us in building a stronger, healthier, and more aware community—because when it comes to drug
                prevention, <strong>every step matters.</strong>
              </p>
              <div className="cta-buttons">
                <Button size="lg" className="cta-primary">
                  <a href="/login" className="cta-link">
                    Get Started Today
                    <ArrowRight className="icon-sm" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="cta-secondary">
                  Learn More About Our Programs
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhoWeAre;