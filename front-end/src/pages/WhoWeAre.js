import React from 'react';
import { CheckCircle, Users, GraduationCap, Heart, ArrowRight } from 'lucide-react';
import '../styles/WhoWeAre.css';


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
      description: "Age-appropriate content (for students, parents, teachers) about drug dangers, refusal skills, and mental health."
    },
    {
      title: "Risk Assessment Tools",
      description: "Using tools like ASSIST and CRAFFT to help you understand personal risks and next steps."
    },
    {
      title: "Online Counseling Support",
      description: "Easy scheduling with counseling experts for advice, psychological support and guidance."
    },
    {
      title: "Community Programs",
      description: "Manage and participate in awareness campaigns, educational seminars and extracurricular activities."
    },
    {
      title: "Blog & Experience Sharing",
      description: "Read real stories, expert advice and tips for daily living."
    },
    {
      title: "Personal Profile & Progress Tracking",
      description: "Track your learning journey, appointments and personal development."
    }
  ];

  const services = [
    {
      emoji: "🧑‍🎓",
      title: "Students",
      description: "From elementary to university - those wanting to learn self-protection and peer pressure resistance.",
      bgColor: "service-card-blue"
    },
    {
      emoji: "👨‍👩‍👧‍👦",
      title: "Parents & Guardians",
      description: "Those wanting to better understand drug prevention and support their children.",
      bgColor: "service-card-green"
    },
    {
      emoji: "🧑‍🏫",
      title: "Teachers & Counselors",
      description: "Educators needing tools to integrate drug prevention education into classrooms.",
      bgColor: "service-card-purple"
    },
    {
      emoji: "🧑‍⚕️",
      title: "Healthcare & Social Workers",
      description: "Professionals who monitor, advise and connect with at-risk individuals.",
      bgColor: "service-card-red"
    },
    {
      emoji: "🏘️",
      title: "Community Organizations",
      description: "Groups conducting awareness campaigns and community support activities.",
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
              We build communities to prevent drug abuse, providing knowledge, tools and support to help people live healthy and safe lives.
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
                  Every year, millions of youth and families are affected by drugs, not just through addiction but also through emotional, social and economic consequences. While treatment is crucial,{" "}
                  <strong>
                    early prevention has proven to be one of the most effective ways to reduce drug use risks
                  </strong>
                  . Prevention begins with awareness, education and timely support.
                </p>
                <p>
                  However, the reality is many don't know where to start. They may feel overwhelmed, ashamed or unaware of risks. Teachers lack guidance materials. Parents don't know how to talk to their children. Students hesitate to ask.
                </p>
                <p className="highlight-text">This is why Drugs Prevention (DP) was created.</p>
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
                  Drugs Prevention is an online support system providing preventive education, interactive tools and professional guidance to help people, especially youth, understand and avoid drug risks.
                </p>
                <p>
                  <strong>We're not just a website. We're a community initiative</strong>—supporting schools, families and organizations in collaborative drug prevention and mental health promotion.
                </p>
              </div>

              <h3 className="subsection-title">Key Features:</h3>
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
                Vision: Values We Believe In
              </h2>
              <div className="vision-grid">
                <div className="vision-column">
                  <p className="belief-item">
                    <span className="belief-emoji">🌟</span>
                    We believe everyone deserves to grow up in a safe, informed and supportive environment.
                  </p>
                  <p className="belief-item">
                    <span className="belief-emoji">📚</span>
                    We believe education is power—when people understand drug risks, recognize early signs and know where to seek help, they make better choices.
                  </p>
                </div>
                <div className="vision-column">
                  <p className="belief-item">
                    <span className="belief-emoji">💻</span>
                    We believe technology can bridge gaps—making prevention resources accessible to anyone, anywhere, anytime.
                  </p>
                  <p className="belief-item">
                    <span className="belief-emoji">🤝</span>
                    We believe community is key—change comes not just from individuals but from collaborative efforts of families, schools and organizations.
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
              <h2 className="section-title">Why This Matters Today</h2>
              <div className="prose">
                <p>
                  Today, drug risks are less recognizable. Substances are more accessible, social media peer influence is stronger, and many youth face psychological challenges that increase risks. <strong>Prevention is no longer optional—it's essential.</strong>
                </p>
                <p>
                  With the right tools, we can help people make safe, informed and confident decisions. Whether saying no at parties, helping a struggling friend, or seeking professional help—<strong className="prevention-highlight">prevention saves lives.</strong>
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
                Whether you're here to learn, teach, help others or seek help for yourself—you're not alone.
              </p>
              <p className="cta-description">
                Let's build a healthy, informed and proactive community together—because in drug prevention, <strong>every step matters.</strong>
              </p>
              <div className="cta-buttons">
                <Button size="lg" className="cta-primary">
                  <a href="/login" className="cta-link">
                    Get started today
                    <ArrowRight className="icon-sm" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="cta-secondary">
                  <a href="/event" className="cta-link">
                    Learn about our programs
                    <ArrowRight className="icon-sm" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default WhoWeAre;