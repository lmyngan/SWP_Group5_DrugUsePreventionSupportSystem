"use client"

// src/pages/ForgetPassword.js
import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/ForgetPassword.css" // Import CSS cho trang này

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("") // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("") // Clear previous messages
    setMessageType("")

    // Simulate API call
    try {
      // In a real application, you would send a request to your backend here
      // For example: await forgotPasswordApi(email);
      console.log(`Sending password reset link to: ${email}`)

      // Simulate success or failure
      if (email.includes("@")) {
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay
        setMessage("A password reset link has been sent to your email address.")
        setMessageType("success")
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setMessage("Please enter a valid email address.")
        setMessageType("error")
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      setMessage("Failed to send reset link. Please try again later.")
      setMessageType("error")
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <p className="instruction-text">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
          <div className="input-box">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <div className={`form-message ${messageType}`}>{message}</div>}

          <button type="submit" className="btn">
            Send Reset Link
          </button>
        </form>
        <div className="back-to-login-link">
          <p>
            Remember your password? <a href="/login">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordPage
