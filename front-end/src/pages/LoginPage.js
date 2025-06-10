"use client"

import "./LoginPage.css"
import { useState } from "react"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login here
    console.log("Login data:", formData)

    // Create a mock user for demo purposes
    const userData = {
      name: formData.email.split("@")[0], // Use part of email as name
      role: "Member",
    }

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData))

    // After successful login, redirect to blog
    window.location.href = "/blog"
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1>🔑 Login</h1>
            <p>Welcome back to DrugsCare</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">📧 Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">🔒 Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              🔑 Login
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="register-link">
                Register now
              </a>
            </p>
          </div>

          <div className="back-to-blog">
            <a href="/blog" className="back-link">
              ← Back to Blog
            </a>
          </div>
        </div>

        <div className="login-info">
          <h2>Join the DrugsCare Community</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">✍️</span>
              <div>
                <h3>Share Articles</h3>
                <p>Write and share your experiences with the community</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💬</span>
              <div>
                <h3>Join Discussions</h3>
                <p>Comment and discuss with other members</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📚</span>
              <div>
                <h3>Save Articles</h3>
                <p>Save your favorite articles to read later</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔔</span>
              <div>
                <h3>Get Notifications</h3>
                <p>Stay updated with the latest program information</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
