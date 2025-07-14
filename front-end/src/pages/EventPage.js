"use client"

import "../styles/EventPage.css"
import { useState, useEffect } from "react"
import LoginStatus from "../components/LoginStatus"
import Footer from "../components/Footer"
import { eventData } from "../service/api"

const EventPage = () => {
  const categories = ["All Posts", "Students", "University Students", "Parents", "Teachers", "Specialists", "Community"]

  // Simulate login status and content
  const [hasContent, setHasContent] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Login status
  const [user, setUser] = useState(null) // User information

  // Check login status from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }

    const fetchEventData = async () => {
      const data = await eventData();
      console.log("Event data from API:", data);
    };
    fetchEventData();
  }, [])

  const handleAddPost = () => {
    if (!isLoggedIn) {
      // Redirect to login page
      window.location.href = "/login"
      return
    }
    // If logged in, redirect to add post page
    window.location.href = "/addpost"
  }

  // Simulate login (for testing)
  const handleLogin = () => {
    const userData = { name: "Dr. John Smith", role: "Specialist" }
    setIsLoggedIn(true)
    setUser(userData)
    // Store in localStorage to persist login state
    localStorage.setItem("user", JSON.stringify(userData))
  }

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    // Remove from localStorage
    localStorage.removeItem("user")
  }

  // Thêm function toggle content
  const toggleContent = () => {
    setHasContent(!hasContent)
  }

  const eventPosts = hasContent
    ? [
      {
        id: 1,
        title: "How to Recognize Signs of Drug Use in Teenagers",
        excerpt:
          "A guide for parents and teachers to identify early warning signs of substance use in children and adolescents...",
        image: "/images/myphoto.jpg",
        category: "Parents",
        author: "Dr. Sarah Johnson",
        date: "March 15, 2024",
        readTime: "5 min read",
        views: "1,234",
      },
      {
        id: 2,
        title: "Peer Pressure Resistance Skills for Students",
        excerpt: "Effective strategies to help students confidently say 'no' to drugs and harmful substances...",
        image: "/images/event1.png",
        category: "Students",
        author: "Prof. Michael Chen",
        date: "March 12, 2024",
        readTime: "7 min read",
        views: "2,156",
      },

    ]
    : []

  const recentPosts = hasContent
    ? [
      {
        title: "ASSIST Test - Assessing Risk of Substance Use",
        date: "March 16, 2024",
      },
      {
        title: "Recovery Story: From Darkness to Light",
        date: "March 14, 2024",
      },
      {
        title: "How to Use the DrugsCare App",
        date: "March 13, 2024",
      },
    ]
    : []

  return (
    <div className="event-page">
      {/* Header */}
      <section className="event-header">
        <div className="container">
          <div className="event-header-content">
            <div className="event-title">
              <h1>Knowledge Sharing Event</h1>
              <p>
                A place to share knowledge, experiences, and stories about drug prevention and social harm reduction
              </p>
            </div>

            {/* User Status */}
            <div className="user-status">
              {isLoggedIn ? (
                <div className="logged-in-user">
                  <div className="user-info">
                    <span className="user-avatar">👤</span>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-role">{user.role}</span>
                    </div>
                  </div>
                  <div className="user-actions">
                    <button className="btn-write-post" onClick={handleAddPost}>
                      ✍️ Write Post
                    </button>
                    <button className="btn-logout" onClick={handleLogout}>
                      🚪 Logout
                    </button>
                    <button className="btn-toggle-content" onClick={toggleContent}>
                      {hasContent ? "🗑️ Clear Posts" : "📝 Add Sample Posts"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="not-logged-in">
                  <p>Login to share your posts</p>
                  <div className="auth-buttons">
                    <button className="btn-login" onClick={handleLogin}>
                      🔑 Login (Demo)
                    </button>
                    <a href="/login" className="btn-login-real">
                      🔑 Login
                    </a>
                    <a href="/register" className="btn-register">
                      📝 Register
                    </a>
                    <button className="btn-toggle-content" onClick={toggleContent}>
                      {hasContent ? "🗑️ Clear Posts" : "📝 Add Sample Posts"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <input type="text" placeholder="Search Blogs..." />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </div>
      </section>

      <section className="event-content">
        <div className="container">
          <div className="event-layout">
            {/* Main Content Area */}
            <div className="main-content">
              {/* Categories Filter */}
              <div className="categories-filter">
                <h3>📂 Blogs Categories</h3>
                <div className="category-tags">
                  {categories.map((category, index) => (
                    <button key={index} className={`category-tag ${index === 0 ? "active" : ""}`}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content based on whether there are posts */}
              {hasContent ? (
                <>
                  {/* Featured Post */}
                  <div className="featured-post">
                    <h2>📌 Featured Blogs</h2>
                    <div className="featured-card">
                      <div className="featured-image">
                        <img src="/images/myphoto.jpg" alt="Featured post" />
                        <span className="featured-badge">Featured</span>
                      </div>
                      <div className="featured-content">
                        <span className="featured-category">Parents</span>
                        <h3>How to Recognize Signs of Drug Use in Teenagers</h3>
                        <p>
                          A detailed guide to help parents and teachers identify early warning signs of substance use in
                          children and adolescents...
                        </p>
                        <div className="featured-meta">
                          <span>👤 Dr. Sarah Johnson</span>
                          <span>📅 March 15, 2024</span>
                          <span>👁️ 1,234 views</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Posts Grid */}
                  <div className="posts-section">
                    <h2>📝 Latest Blogs</h2>
                    <div className="posts-grid">
                      {eventPosts.map((post) => (
                        <article key={post.id} className="post-card">
                          <div className="post-image">
                            <img src={post.image || "/placeholder.svg"} alt={post.title} />
                            <span className="post-category">{post.category}</span>
                          </div>
                          <div className="post-content">
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <div className="post-meta">
                              <div className="author-info">
                                <span className="author">👤 {post.author}</span>
                                <span className="date">📅 {post.date}</span>
                              </div>
                              <div className="post-stats">
                                <span className="read-time">⏱️ {post.readTime}</span>
                                <span className="views">👁️ {post.views}</span>
                              </div>
                            </div>
                            <button className="join-btn">Join →</button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="pagination">
                    <button className="page-btn">« Previous</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">Next »</button>
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="empty-state">
                  <div className="empty-state-content">
                    <div className="empty-icon">📝</div>
                    <h2>No Blogs Yet</h2>
                    <p>
                      The Event currently has no blog. Please come back later or explore other features of DrugsCare.
                    </p>
                    <div className="empty-actions">
                      <button className="btn-primary" onClick={handleAddPost}>
                        {isLoggedIn ? "📝 Add Sample Blogs" : "📝 Login to Write Posts"}
                      </button>
                      <a href="/freecourse" className="btn-secondary">
                        📚 View Courses
                      </a>
                    </div>

                    {/* Login prompt for non-logged users */}
                    {!isLoggedIn && (
                      <div className="login-prompt">
                        <div className="login-prompt-content">
                          <h3>🔐 You're Not Logged In</h3>
                          <p>To share blogs and join the community, please login or create a new account.</p>
                          <div className="login-prompt-actions">
                            <a href="/login" className="btn-login-prompt">
                              🔑 Login Now
                            </a>
                            <a href="/register" className="btn-register-prompt">
                              📝 Create Account
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suggested Actions */}
                  <div className="suggested-actions">
                    <h3>💡 While you wait, you can:</h3>
                    <div className="suggestion-cards">
                      <div className="suggestion-card">
                        <div className="suggestion-icon">📋</div>
                        <h4>Take Assessment Tests</h4>
                        <p>Complete ASSIST or CRAFFT tests to assess your risk level</p>
                        <button className="suggestion-btn">Start Test</button>
                      </div>
                      <div className="suggestion-card">
                        <div className="suggestion-icon">📚</div>
                        <h4>Join Courses</h4>
                        <p>Learn from free courses about drug prevention and social harm reduction</p>
                        <a href="/freecourse" className="suggestion-btn">
                          View Courses
                        </a>
                      </div>
                      <div className="suggestion-card">
                        <div className="suggestion-icon">👨‍⚕️</div>
                        <h4>Consult Specialists</h4>
                        <p>Schedule appointments with professional counselors</p>
                        <a href="/mentor" className="suggestion-btn">
                          Book Appointment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              {/* About Event */}
              <div className="sidebar-widget">
                <h3>📖 About DrugsCare Event</h3>
                <div className="about-event">
                  <p>
                    A event sharing professional knowledge about drug prevention and social harm reduction, supporting
                    the community in education and awareness raising.
                  </p>
                  <div className="event-stats">
                    <div className="stat-item">
                      <strong>{hasContent ? "500+" : "0"}</strong>
                      <span>Blogs</span>
                    </div>
                    <div className="stat-item">
                      <strong>{hasContent ? "10K+" : "0"}</strong>
                      <span>Reads</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Actions Widget */}
              {!isLoggedIn && (
                <div className="sidebar-widget">
                  <h3>👤 Join Community</h3>
                  <div className="join-community">
                    <p>Login to share experiences and connect with the community</p>
                    <div className="join-actions">
                      <a href="/login" className="join-btn login">
                        🔑 Login
                      </a>
                      <a href="/register" className="join-btn register">
                        📝 Register
                      </a>
                    </div>
                    <div className="join-benefits">
                      <h4>Benefits of joining:</h4>
                      <ul>
                        <li>✍️ Share blogs</li>
                        <li>💬 Comment and discuss</li>
                        <li>📚 Save favorite blogs</li>
                        <li>🔔 Receive notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Posts */}
              <div className="sidebar-widget">
                <h3>🕒 Recent Blogs</h3>
                <div className="recent-posts">
                  {hasContent ? (
                    recentPosts.map((post, index) => (
                      <div key={index} className="recent-post-item">
                        <h4>{post.title}</h4>
                        <span className="recent-date">{post.date}</span>
                      </div>
                    ))
                  ) : (
                    <div className="empty-recent">
                      <p>No recent blogs</p>
                      <small>New blogs will appear here</small>
                    </div>
                  )}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="sidebar-widget">
                <h3>🏷️ Popular Tags</h3>
                <div className="popular-tags">
                  {hasContent ? (
                    <>
                      <span className="tag">Drug Prevention</span>
                      <span className="tag">Education</span>
                      <span className="tag">Psychology</span>
                      <span className="tag">Health</span>
                      <span className="tag">Family</span>
                      <span className="tag">Teenagers</span>
                      <span className="tag">Community</span>
                      <span className="tag">Recovery</span>
                    </>
                  ) : (
                    <div className="empty-tags">
                      <p>No tags yet</p>
                      <small>Tags will be created from blogs</small>
                    </div>
                  )}
                </div>
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget">
                <h3>📧 Subscribe to Newsletter</h3>
                <div className="newsletter">
                  <p>Receive notifications about new blogs and useful information</p>
                  <div className="newsletter-form">
                    <input type="email" placeholder="Your email" />
                    <button className="subscribe-btn">Subscribe</button>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="sidebar-widget">
                <h3>🔗 Quick Links</h3>
                <div className="quick-links">
                  <a href="/freecourse" className="quick-link">
                    📚 Free Courses
                  </a>
                  <a href="/mentor" className="quick-link">
                    👨‍⚕️ Consult Specialists
                  </a>
                  <a href="/whoweare" className="quick-link">
                    ℹ️ About Us
                  </a>
                  <a href="/" className="quick-link">
                    📞 Support Hotline
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Login Status Component */}
      <LoginStatus />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default EventPage
