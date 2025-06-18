"use client"

import "../styles/BlogPage.css"
import { useState, useEffect } from "react"
import LoginStatus from "../components/LoginStatus"

const Blog = () => {
  const categories = ["All Posts", "Students", "University Students", "Parents", "Teachers", "Specialists", "Community"]

  // Simulate login status and content
  const [hasContent, setHasContent] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Login status
  const [user, setUser] = useState(null) // User information

  // Check login status from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }
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

  const blogPosts = hasContent
    ? [
        {
          id: 1,
          title: "How to Recognize Signs of Drug Use in Teenagers",
          excerpt:
            "A guide for parents and teachers to identify early warning signs of substance use in children and adolescents...",
          image: "/placeholder.svg?height=200&width=300",
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
          image: "/placeholder.svg?height=200&width=300",
          category: "Students",
          author: "Prof. Michael Chen",
          date: "March 12, 2024",
          readTime: "7 min read",
          views: "2,156",
        },
        {
          id: 3,
          title: "The Impact of Drugs on Brain and Health",
          excerpt: "Scientific research on the serious damage that drugs cause to the nervous system...",
          image: "/placeholder.svg?height=200&width=300",
          category: "University Students",
          author: "Dr. Emily Rodriguez",
          date: "March 10, 2024",
          readTime: "10 min read",
          views: "987",
        },
        {
          id: 4,
          title: "Drug Prevention Education Programs",
          excerpt: "Introduction to effective educational programs being implemented in schools...",
          image: "/placeholder.svg?height=200&width=300",
          category: "Teachers",
          author: "Ms. Lisa Thompson",
          date: "March 8, 2024",
          readTime: "6 min read",
          views: "1,543",
        },
        {
          id: 5,
          title: "Psychological Support for Families Affected by Addiction",
          excerpt: "How to provide psychological support and care for family members affected by addiction...",
          image: "/placeholder.svg?height=200&width=300",
          category: "Parents",
          author: "Dr. James Wilson",
          date: "March 5, 2024",
          readTime: "8 min read",
          views: "876",
        },
        {
          id: 6,
          title: "The Role of Community in Drug Prevention",
          excerpt: "The importance of active community participation in drug prevention and social harm reduction...",
          image: "/placeholder.svg?height=200&width=300",
          category: "Community",
          author: "Mr. Robert Kim",
          date: "March 3, 2024",
          readTime: "9 min read",
          views: "1,234",
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
    <div className="blog-page">
      {/* Header */}
      <section className="blog-header">
        <div className="container">
          <div className="blog-header-content">
            <div className="blog-title">
              <h1>Knowledge Sharing Blog</h1>
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
                  </div>
                </div>
              ) : (
                <div className="not-logged-in">
                  <p>Login to share your posts</p>
                  <div className="auth-buttons">
                    
                    <a href="/login" className="btn-login-real">
                      🔑 Login
                    </a>
                    <a href="/register" className="btn-register">
                      📝 Register
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <input type="text" placeholder="Search articles..." />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-layout">
            {/* Main Content Area */}
            <div className="main-content">
              {/* Categories Filter */}
              <div className="categories-filter">
                <h3>📂 Article Categories</h3>
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
                    <h2>📌 Featured Article</h2>
                    <div className="featured-card">
                      <div className="featured-image">
                        <img src="/placeholder.svg?height=300&width=500" alt="Featured post" />
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

                  {/* Blog Posts Grid */}
                  <div className="posts-section">
                    <h2>📝 Latest Articles</h2>
                    <div className="posts-grid">
                      {blogPosts.map((post) => (
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
                            <button className="read-more-btn">Read More →</button>
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
                    <h2>No Articles Yet</h2>
                    <p>
                      The blog currently has no content. Please come back later or explore other features of DrugsCare.
                    </p>
                    <div className="empty-actions">
                      <button className="btn-write-post" onClick={handleAddPost}>
                        {isLoggedIn ? "📝 Add Sample Articles" : "📝 Login to Write Posts"}
                      </button>
                      
                    </div>

                    {/* Login prompt for non-logged users */}
                    {!isLoggedIn && (
                      <div className="login-prompt">
                        <div className="login-prompt-content">
                          <h3>🔐 You're Not Logged In</h3>
                          <p>To share articles and join the community, please login or create a new account.</p>
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
              {/* About Blog */}
              <div className="sidebar-widget">
                <h3>📖 About DrugsCare Blog</h3>
                <div className="about-blog">
                  <p>
                    A blog sharing professional knowledge about drug prevention and social harm reduction, supporting
                    the community in education and awareness raising.
                  </p>
                  <div className="blog-stats">
                    <div className="stat-item">
                      <strong>{hasContent ? "500+" : "0"}</strong>
                      <span>Articles</span>
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
                        <li>✍️ Share articles</li>
                        <li>💬 Comment and discuss</li>
                        <li>📚 Save favorite articles</li>
                        <li>🔔 Receive notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Posts */}
              <div className="sidebar-widget">
                <h3>🕒 Recent Articles</h3>
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
                      <p>No recent articles</p>
                      <small>New articles will appear here</small>
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
                      <small>Tags will be created from articles</small>
                    </div>
                  )}
                </div>
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget">
                <h3>📧 Subscribe to Newsletter</h3>
                <div className="newsletter">
                  <p>Receive notifications about new articles and useful information</p>
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
                  
                  <a href="/mentor" className="quick-link">
                    👨‍⚕️ Consult Specialists
                  </a>
                  <a href="/whoweare" className="quick-link">
                    ℹ️ About Us
                  </a>
                  <a href="#" className="quick-link">
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
    </div>
  )
}

export default Blog
