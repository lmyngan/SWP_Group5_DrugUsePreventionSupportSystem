"use client"

import { useState, useEffect } from "react"
import "../styles/BlogPage.css"

import { blogData, addBlog, getRateBlog } from "../service/api";
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
  const [showRateModal, setShowRateModal] = useState(false);
  const [rateBlogId, setRateBlogId] = useState(null);
  const [selectedRate, setSelectedRate] = useState(0);

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
      setShowCreateForm(false);
      setNewBlog((prev) => ({ ...prev, event_id: eventId }));
    } else {
      setShowCreateForm(false);
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


  const handleRateBlog = async (blogId, rate) => {
    if (!user) {
      alert("Please login to rate blogs");
      return;
    }
    try {
      const response = await getRateBlog({ blogId: Number(blogId), rating: Number(rate) });
      if (!response.error) {
        setBlogs(blogs.map((blog) => (blog.blog_id === blogId ? { ...blog, rate } : blog)));
        setShowRateModal(false);
        setSelectedRate(0);
        setRateBlogId(null);
        alert("Thank you for rating!");
      } else {
        if (response.error.toLowerCase().includes('401') || response.error.toLowerCase().includes('403')) {
          alert("You must be logged in to rate blogs.");
        } else {
          alert("Failed to rate blog: " + response.error);
        }
      }
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        alert("You must be logged in to rate blogs.");
      } else {
        alert("An error occurred while rating the blog.");
      }
    }
  };

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
                    <span>by {blog.authorFullName}</span>
                    {blog.event_name && (
                      <>
                        <span className="event-separator">•</span>
                        <span className="event-link">from {blog.event_name}</span>
                      </>
                    )}
                  </div>

                  <p className="blog-content">{blog.content}</p>

                  <div className="blog-actions">
                    <button className="action-btn rate-btn" onClick={() => { setShowRateModal(true); setRateBlogId(blog.blog_id); }}>
                      <span className="action-icon">⭐</span>
                      <span>Rate</span>
                    </button>
                    {showRateModal && rateBlogId === blog.blog_id && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
                          <h3 className="text-lg font-semibold mb-4">Rate this blog</h3>
                          <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                className={`text-2xl ${selectedRate >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                                onClick={() => setSelectedRate(star)}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleRateBlog(blog.blog_id, selectedRate)} disabled={selectedRate === 0}>Submit</button>
                            <button className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400" onClick={() => { setShowRateModal(false); setSelectedRate(0); setRateBlogId(null); }}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
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


    </div>
  )
}

export default BlogPage
