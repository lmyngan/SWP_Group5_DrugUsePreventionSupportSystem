"use client"

import { useState, useEffect } from "react"
import "../styles/BlogPage.css"
import Footer from "../components/Footer" // Import the new Footer component
import { blogData, addBlog } from "../service/api";
import { useLocation } from "react-router-dom";

const BlogPage = ({ navigateTo }) => {
  const location = useLocation();
  const [blogs, setBlogs] = useState([])
  const [events, setEvents] = useState([])
  const [user, setUser] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    event_id: "",
    categories: 1,
  })

  const blogCategories = [
    { id: "all", name: "All Stories" },
    { id: 1, name: "Personal Experience" },
    { id: 2, name: "Educational Content" },
    { id: 3, name: "Support & Advice" },
  ]

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventId = params.get("event");
    if (eventId) {
      setShowCreateForm(true);
      setNewBlog((prev) => ({ ...prev, event_id: eventId }));
    }
    // Fetch current user
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Fetch blogs
    const fetchBlogs = async () => {
      setLoading(true);
      const data = await blogData();
      setBlogs(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchBlogs();

    // Fetch events (nếu cần)
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Failed to fetch events for blog page:", error));
  }, [location.search]);

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch = selectedCategory === "all" || blog.categories === selectedCategory
    const eventMatch = selectedEvent === "all" || blog.event_id === Number.parseInt(selectedEvent)
    return categoryMatch && eventMatch
  })

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to share your experience");
      return;
    }

    if (!newBlog.title || !newBlog.content || !newBlog.event_id) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await addBlog({
        authorId: user.account_id,
        categories: Number.parseInt(newBlog.categories),
        title: newBlog.title,
        content: newBlog.content,
        event_id: Number.parseInt(newBlog.event_id),
      });

      if (!response.error) {
        // Lấy lại danh sách blogs mới nhất
        const data = await blogData();
        setBlogs(Array.isArray(data) ? data : []);
        setNewBlog({ title: "", content: "", event_id: "", categories: 1 });
        setShowCreateForm(false);
        alert("Blog shared successfully!");
      } else {
        alert(`Failed to share experience: ${response.error}`);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred while sharing your experience.");
    }
  };

  const handleLikeBlog = (blogId) => {
    if (!user) {
      alert("Please login to like posts")
      return
    }
    // Simulate like update - ideally this would also be an API call
    setBlogs(blogs.map((blog) => (blog.blog_id === blogId ? { ...blog, likes: blog.likes + 1 } : blog)))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (categoryId) => {
    switch (categoryId) {
      case 1:
        return "category-personal"
      case 2:
        return "category-educational"
      case 3:
        return "category-support"
      default:
        return "category-default"
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>,
      )
    }

    return stars
  }

  if (loading) {
    return (
      <div className="blogpage">
        <div className="loading-container">
          <div className="loading-text">Loading experiences...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="blogpage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Share Your Recovery Journey</h1>
            <p>
              Your story matters. Share your experiences, inspire others, and build connections within our supportive
              community of recovery and prevention.
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => (user ? setShowCreateForm(true) : alert("Please login to share your experience"))}
              >
                Share Your Story
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById("blogs-section").scrollIntoView()}>
                Read Experiences
              </button>

            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/matuy.webp" alt="Community Stories" />
        </div>
      </section>

      {/* Blog Categories Section */}
      <section className="overview-section">
        <div className="container">
          <h2>Types of Stories</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-icon">💭</div>
              <h3>Personal Experiences</h3>
              <p>Share your personal journey of recovery, challenges overcome, and lessons learned along the way.</p>
              <button className="overview-link" onClick={() => setSelectedCategory(1)}>
                Read Stories
              </button>
            </div>
            <div className="overview-card">
              <div className="overview-icon">📖</div>
              <h3>Educational Content</h3>
              <p>Professional insights, research findings, and educational resources about prevention and recovery.</p>
              <button className="overview-link" onClick={() => setSelectedCategory(2)}>
                Learn More
              </button>
            </div>
            <div className="overview-card">
              <div className="overview-icon">🤲</div>
              <h3>Support & Advice</h3>
              <p>Practical tips, advice for families, and guidance for supporting loved ones in their journey.</p>
              <button className="overview-link" onClick={() => setSelectedCategory(3)}>
                Get Support
              </button>
            </div>
            <div className="overview-card">
              <div className="overview-icon">🎯</div>
              <h3>Event Experiences</h3>
              <p>Share your experiences from community events and how they impacted your journey.</p>
              <button className="overview-link" onClick={() => navigateTo && navigateTo("events")}>
                Join Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-controls">
            <div className="filter-group">
              <label>Category:</label>
              <div className="filter-tabs">
                {blogCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`filter-tab ${selectedCategory === category.id ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label>Event:</label>
              <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} className="event-filter">
                <option value="all">All Events</option>
                {events.map((event) => (
                  <option key={event.event_id} value={event.event_id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Create Blog Form */}
      {showCreateForm && (
        <section className="create-form-section">
          <div className="container">
            <div className="create-form-overlay">
              <div className="create-form">
                <div className="form-header">
                  <h3>Share Your Experience</h3>
                  <button className="close-btn" onClick={() => setShowCreateForm(false)}>
                    ×
                  </button>
                </div>
                <form onSubmit={handleCreateBlog}>
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      placeholder="Give your story a meaningful title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Related Event *</label>
                    <select
                      value={newBlog.event_id}
                      onChange={(e) => setNewBlog({ ...newBlog, event_id: e.target.value })}
                      required
                    >
                      <option value="">Select an event</option>
                      {events.map((event) => (
                        <option key={event.event_id} value={event.event_id}>
                          {event.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newBlog.categories}
                      onChange={(e) => setNewBlog({ ...newBlog, categories: e.target.value })}
                    >
                      <option value={1}>Personal Experience</option>
                      <option value={2}>Educational Content</option>
                      <option value={3}>Support & Advice</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Your Story *</label>
                    <textarea
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      placeholder="Share your experience, insights, or advice..."
                      rows="6"
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Share Experience
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blogs List Section */}
      <section id="blogs-section" className="blogs-section">
        <div className="container">
          <div className="section-header">
            <h2>Community Experiences</h2>
            <button
              className="btn-primary"
              onClick={() => (user ? setShowCreateForm(true) : alert("Please login to share your experience"))}
            >
              Share Your Story
            </button>
          </div>
          {filteredBlogs.length === 0 ? (
            <div className="no-blogs">
              <p>No experiences found for the selected filters.</p>
              <button
                className="btn-primary"
                onClick={() => (user ? setShowCreateForm(true) : alert("Please login to share your experience"))}
              >
                Be the first to share
              </button>
            </div>
          ) : (
            <div className="blogs-grid">
              {filteredBlogs.map((blog) => (
                <article key={blog.blog_id} className="blog-card">
                  <div className="blog-header">
                    <div className="blog-meta">
                      <span className={`blog-category ${getCategoryColor(blog.categories)}`}>{blog.category_name}</span>
                      <span className="blog-date">{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="blog-rating">
                      {blog.rate > 0 && (
                        <>
                          <div className="stars">{renderStars(blog.rate)}</div>
                          <span className="rating-value">({blog.rate})</span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="blog-title">{blog.title}</h3>

                  <div className="blog-author">
                    <span className="author-icon">👤</span>
                    <span>by {blog.author_name}</span>
                    {blog.event_name && (
                      <>
                        <span className="event-separator">•</span>
                        <span className="event-link">from {blog.event_name}</span>
                      </>
                    )}
                  </div>

                  <p className="blog-content">{blog.content}</p>

                  <div className="blog-actions">
                    <button className="action-btn like-btn" onClick={() => handleLikeBlog(blog.blog_id)}>
                      <span className="action-icon">👍</span>
                      <span>{blog.likes}</span>
                    </button>
                    <button className="action-btn comment-btn">
                      <span className="action-icon">💬</span>
                      <span>{blog.comments}</span>
                    </button>
                    <button className="action-btn share-btn">
                      <span className="action-icon">📤</span>
                      <span>Share</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Share Your Experience?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Inspire Others</h3>
              <p>Your story can provide hope and motivation to others who are facing similar challenges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Build Community</h3>
              <p>Connect with others who understand your journey and create meaningful relationships</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Personal Growth</h3>
              <p>Reflecting on and sharing your experience can be therapeutic and aid in your own healing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Educate & Inform</h3>
              <p>Help others learn from your experiences and contribute to prevention efforts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Your Story Matters</h2>
          <p>
            Every experience shared helps build a stronger, more supportive community. Join us in creating a space where
            everyone feels heard and supported.
          </p>
          <div className="cta-buttons">
            <button
              className="btn-primary"
              onClick={() => (user ? setShowCreateForm(true) : alert("Please login to share your experience"))}
            >
              Share Your Experience
            </button>
            <button className="btn-outline" onClick={() => navigateTo && navigateTo("events")}>
              Join Community Events
            </button>
          </div>
        </div>
      </section>

      <Footer navigateTo={navigateTo} />
    </div>
  )
}

export default BlogPage
