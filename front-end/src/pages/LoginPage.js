<<<<<<< HEAD
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
=======
// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'test@gmail.com' && password === '1') {
      navigate('/');
      alert('Login successful!');
    }
    if (email === 'admin@gmail.com' && password === '1') {
      navigate('/');
      alert('Login successful!');
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <form className="login-form" onSubmit={handleSubmit}>

          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
            </svg>
          </div>

          <div className='social-login'>
            <button>Google</button>
            <button>Facebook</button>
            <button>Twitter</button>
            <button>GitHub</button>
          </div>

          <div className="forgot-password">
            <label><input type="checkbox" /> Remember Me</label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className='btn'>Login</button>

        </form>

        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>

>>>>>>> d38da7311568861c49704137fad6a99fa4241a4c
      </div>

    </div>
  )
}

export default Login
