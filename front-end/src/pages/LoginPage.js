"use client"

// src/pages/LoginPage.js
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaTimes, FaCheck } from "react-icons/fa"
import "../styles/LoginPage.css"
import { loginUser, getUserById } from "../service/api"


const LoginPage = () => {
  const [accountname, setAccountname] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  // State cho notification
  const [notification, setNotification] = useState({
    show: false,
    type: "", // 'success' hoặc 'error'
    message: "",
  })

  // Hàm hiển thị notification
  const showNotification = (type, message, duration = 4000) => {
    setNotification({
      show: true,
      type,
      message,
    })

    // Tự động ẩn notification sau thời gian được set
    setTimeout(() => {
      setNotification({
        show: false,
        type: "",
        message: "",
      })
    }, duration)
  }

  // Hàm đóng notification thủ công
  const closeNotification = () => {
    setNotification({
      show: false,
      type: "",
      message: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const credentials = { accountname, password }
      const response = await loginUser(credentials)

      if (response?.token) {
        localStorage.setItem("token", response.token)
        const user = await getUserById(response.accountId)
        localStorage.setItem("user", JSON.stringify(user))

        // Hiển thị thông báo thành công
        showNotification("success", "LOGIN SUCCESSFUL", 1000)

        // Chuyển hướng sau khi hiển thị thông báo
        setTimeout(() => {
          if (user.roleId === 4) {
            window.location.href = "/"
          } else {
            window.location.href = "/dashboard"
          }
        }, 1000)
      } else {
        const errorMessage = response.message || "Login failed! Please check your username or password."
        showNotification("error", errorMessage)
      }
    } catch (error) {
      console.error("Login error:", error)

      let errorMessage = "Login failed! Please try again."

      if (error.message) {
        errorMessage = error.message
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid username or password. Please check your credentials and try again."
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied. Your account may be suspended or inactive."
      } else if (error.response?.status === 500) {
        errorMessage = "Server error occurred. Please try again later."
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network and try again."
      }

      showNotification("error", errorMessage)
    }
  }

  return (
    <div className="login-container">
      {/* Notification Component */}
      {notification.show && (
        <div className={`notification-box ${notification.type}`}>
          <div className="notification-content">
            {notification.type === "error" && (
              <>
                <div className="notification-icon error-icon">
                  <FaTimes />
                </div>
                <div className="notification-text">
                  <span className="notification-title">Error:</span>
                  <span className="notification-message">{notification.message}</span>
                </div>
                <button className="notification-close" onClick={closeNotification}>
                  <FaTimes />
                </button>
              </>
            )}

            {notification.type === "success" && (
              <div className="success-notification">
                <div className="success-title">{notification.message}</div>
                <div className="success-icon">
                  <FaCheck />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <label htmlFor="title">Email/Username</label>
            <input
              type="text"
              id="accountname"
              placeholder="Account Name"
              value={accountname}
              onChange={(e) => setAccountname(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="title">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="register-link">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
