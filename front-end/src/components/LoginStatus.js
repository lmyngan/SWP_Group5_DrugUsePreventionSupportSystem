"use client"

import { useState, useEffect } from "react"
import "./LoginStatus.css"

const LoginStatus = () => {
  // Get login status from localStorage or sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const toggleStatus = () => {
    setShowStatus(!showStatus)
  }

  return (
    <div className="login-status-container">
      <button className="status-toggle" onClick={toggleStatus}>
        {isLoggedIn ? "👤 Logged In" : "🔒 Not Logged In"}
      </button>

      {showStatus && (
        <div className="status-details">
          <div className="status-header">
            <h3>Login Status</h3>
            <button className="close-btn" onClick={() => setShowStatus(false)}>
              ×
            </button>
          </div>

          <div className="status-content">
            <div className="status-item">
              <span className="status-label">Status:</span>
              <span className={`status-value ${isLoggedIn ? "logged-in" : "logged-out"}`}>
                {isLoggedIn ? "Logged In" : "Not Logged In"}
              </span>
            </div>

            {isLoggedIn && user && (
              <>
                <div className="status-item">
                  <span className="status-label">User:</span>
                  <span className="status-value">{user.name}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Role:</span>
                  <span className="status-value">{user.role}</span>
                </div>
              </>
            )}

            <div className="status-actions">
              {isLoggedIn ? (
                <button
                  className="status-btn logout"
                  onClick={() => {
                    localStorage.removeItem("user")
                    setIsLoggedIn(false)
                    setUser(null)
                    window.location.reload()
                  }}
                >
                  Logout
                </button>
              ) : (
                <a href="/login" className="status-btn login">
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginStatus
