"use client"

import { useState, useEffect } from "react"
import "../styles/BlogPage.css"

import { blogData, getRateBlog } from "../service/api";
import { useLocation } from "react-router-dom";

const BlogPage = ({ navigateTo }) => {
  const [blogs, setBlogs] = useState([])
  const [events, setEvents] = useState([])
  const [user, setUser] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [loading, setLoading] = useState(true)

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
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchBlogs = async () => {
      setLoading(true);
      const data = await blogData();
      setBlogs(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch = selectedCategory === "all" || blog.categories === selectedCategory
    const eventMatch = selectedEvent === "all" || blog.event_id === Number.parseInt(selectedEvent)
    return categoryMatch && eventMatch
  })



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



      {/* Blogs List Section */}
      <section id="blogs-section" className="blogs-section">
        <div className="container">
          <div className="section-header">
            <h2>Community Experiences</h2>
          </div>
          {filteredBlogs.length === 0 ? (
            <div className="no-blogs">
              <p>No experiences found for the selected filters.</p>
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
                          <span className="rating-value">({blog.rate.toFixed(1)})</span>
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
                            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleRateBlog(blog.blogId, selectedRate)} disabled={selectedRate === 0}>Submit</button>
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





    </div>
  )
}

export default BlogPage
