"use client"

import { useState, useEffect } from "react"
import "./Navbar.css"

const Navbar = ({ navigateTo, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // Check login status
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Handle navigation
  const handleNavigation = (page) => {
    navigateTo(page)
    setIsMenuOpen(false) // Close mobile menu
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    navigateTo("home")
  }

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="logo" onClick={() => handleNavigation("home")}>
          DrugsCare
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <button
              className={`nav-link ${currentPage === "home" ? "active" : ""}`}
              onClick={() => handleNavigation("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentPage === "whoweare" ? "active" : ""}`}
              onClick={() => handleNavigation("whoweare")}
            >
              Who We Are
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentPage === "freecourse" ? "active" : ""}`}
              onClick={() => handleNavigation("freecourse")}
            >
              Free Courses
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentPage === "mentor" ? "active" : ""}`}
              onClick={() => handleNavigation("mentor")}
            >
              Mentors
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentPage === "blog" ? "active" : ""}`}
              onClick={() => handleNavigation("blog")}
            >
              Blog
            </button>
          </li>
        </ul>

        {/* Right Section */}
        <div className="right-section">
          {/* Search Box */}
          <input type="text" className="search-box" placeholder="Search..." />

          {/* Auth Section */}
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-avatar">👤</span>
                  <span className="user-name">{user?.name}</span>
                </div>
                <div className="user-dropdown">
                  <button className="dropdown-item" onClick={() => handleNavigation("addpost")}>
                    ✍️ Write Post
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="auth-link login" onClick={() => handleNavigation("login")}>
                  Login
                </button>
                <button className="auth-link register" onClick={() => handleNavigation("register")}>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
