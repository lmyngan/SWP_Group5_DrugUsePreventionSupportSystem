// src/pages/ForgetPassword.js
import { useState } from "react"
import { forgotPasswordUser, resetPasswordUser } from "../service/api"
import "../styles/ForgetPassword.css"

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [showResetForm, setShowResetForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setMessage("")
    setMessageType("")
    setIsLoading(true)

    try {
      const response = await forgotPasswordUser({ email })

      if (response.error) {
        setMessage(response.error)
        setMessageType("error")
      } else {
        setMessage(response.message || "A password reset link has been sent to your email address.")
        setMessageType("success")
        setShowResetForm(true)
        if (response.resetLink) {
          const urlParams = new URLSearchParams(response.resetLink.split('?')[1])
          const tokenFromLink = urlParams.get('token')
          if (tokenFromLink) {
            setToken(tokenFromLink)
          }
        }
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      setMessage("Failed to send reset link. Please try again later.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setMessage("")
    setMessageType("")

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.")
      setMessageType("error")
      return
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.")
      setMessageType("error")
      return
    }

    setIsLoading(true)

    try {
      const response = await resetPasswordUser({
        token: token,
        newPassword: newPassword
      })

      if (response.error) {
        setMessage(response.error)
        setMessageType("error")
      } else {
        setMessage(response.message || "Password reset successfully!")
        setMessageType("success")
        setTimeout(() => {
          setShowResetForm(false)
          setEmail("")
          setToken("")
          setNewPassword("")
          setConfirmPassword("")
          setMessage("")
          setMessageType("")
        }, 2000)
      }
    } catch (error) {
      console.error("Reset password error:", error)
      setMessage("Failed to reset password. Please try again later.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualTokenInput = (e) => {
    setToken(e.target.value)
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {!showResetForm ? (
          <form className="forgot-password-form" onSubmit={handleForgotPassword}>
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
                disabled={isLoading}
              />
            </div>

            {message && <div className={`form-message ${messageType}`}>{message}</div>}

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <form className="forgot-password-form" onSubmit={handleResetPassword}>
            <h1>Reset Password</h1>
            <p className="instruction-text">
              Enter your new password below.
            </p>

            <div className="input-box" hidden>
              <label htmlFor="token">Reset Token</label>
              <input
                type="text"
                id="token"
                placeholder="Enter reset token from email"
                value={token}
                onChange={handleManualTokenInput}
                required
                disabled={isLoading}
              />
            </div>

            <div className="input-box">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="input-box">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {message && <div className={`form-message ${messageType}`}>{message}</div>}

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setShowResetForm(false)
                setMessage("")
                setMessageType("")
              }}
              disabled={isLoading}
            >
              Back to Forgot Password
            </button>
          </form>
        )}

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
