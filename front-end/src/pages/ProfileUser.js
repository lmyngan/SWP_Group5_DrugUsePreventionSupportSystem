"use client"

import { useEffect, useState, useRef } from "react"
import { Card, Container, Row, Col } from "react-bootstrap"
import { getTestScore, getNotificationsByAccountId } from "../service/api"
import "../styles/ProfileUser.css"

const ProfileUser = () => {
  const [user, setUser] = useState(null)
  const [testScore, setTestScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const bellRef = useRef(null);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    if (!showDropdown) return;
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)

      // Fetch test results if user has accountId
      if (userData.accountId) {
        fetchTestResults(userData.accountId)
        fetchNotifications(userData.accountId)
      }
    }

    // Load saved profile image
    const savedImage = localStorage.getItem("profileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  const fetchTestResults = async (accountId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await getTestScore(accountId)
      if (response.error) {
        setError(response.error)
      } else {
        // Get the latest test result score
        const results = Array.isArray(response) ? response : [response]
        if (results.length > 0) {
          // Get the most recent result (assuming results are ordered by date)
          const latestResult = results[0]
          setTestScore(latestResult.score)
        }
      }
    } catch (err) {
      setError("Failed to fetch test results")
    } finally {
      setLoading(false)
    }
  }

  const fetchNotifications = async (accountId) => {
    try {
      const res = await getNotificationsByAccountId(accountId);
      if (Array.isArray(res)) {
        setNotifications(res);
      } else if (res && res.data && Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        setNotifications([]);
      }
    } catch {
      setNotifications([]);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target.result
        setProfileImage(imageDataUrl)
        localStorage.setItem("profileImage", imageDataUrl)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please select a valid image file (.jpg, .png, .gif, etc.)")
    }
  }

  const removeProfileImage = () => {
    setProfileImage(null)
    localStorage.removeItem("profileImage")
  }

  if (!user) {
    return (
      <Container className="mt-5">
        <h4>Please login to view your profile.</h4>
      </Container>
    )
  }

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {/* Profile Card */}
          <Card className="profile-card">
            <div className="profile-header">User Profile</div>
            <Card.Body className="profile-body">
              {/* Profile Image Upload Section */}
              <div className="profile-image-section">
                <div className="profile-avatar">
                  {profileImage ? (
                    <img src={profileImage || "/placeholder.svg"} alt="Profile" className="profile-image" />
                  ) : (
                    <div className="default-avatar">👤</div>
                  )}
                </div>
                <div className="profile-avatar-actions">
                  <label htmlFor="imageUpload" className="upload-btn" title="Upload image">
                    📷
                  </label>
                  {profileImage && (
                    <button className="remove-btn" onClick={removeProfileImage} title="Remove image" type="button">
                      🗑️
                    </button>
                  )}
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              {/* Notification Section */}
              <div style={{ position: 'absolute', top: 18, right: 24, zIndex: 10 }}>
                <button
                  className="notification-btn"
                  style={{ position: 'relative', background: '#f5f6fa', border: '1px solid #667eea', color: '#2c3e50', borderRadius: '50%', padding: '0.6rem', width: 44, height: 44, minWidth: 44, minHeight: 44, fontWeight: 600, fontSize: 22, cursor: 'pointer', outline: 'none', boxShadow: '0 2px 8px rgba(102,126,234,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setShowDropdown((v) => !v)}
                  aria-label="Notifications"
                  ref={bellRef}
                >
                  <span role="img" aria-label="notification">🔔</span>
                  {notifications.length > 0 && (
                    <span className="notification-badge">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showDropdown && (
                  <div className="notification-dropdown" ref={dropdownRef}>
                    <div className="dropdown-arrow" />
                    <div className="dropdown-header">Notifications</div>
                    {notifications.length === 0 ? (
                      <div className="dropdown-empty">No notifications found.</div>
                    ) : (
                      <ul className="notification-list" style={{ margin: 0 }}>
                        {notifications.map((n, idx) => (
                          <li key={n.notificationId || idx} className="notification-item" style={{ width: '100%', maxWidth: 400, justifyContent: 'center' }}>
                            <span className="notification-icon" role="img" aria-label="notification">🔔</span>
                            <span className="notification-message" style={{ textAlign: 'center', width: '100%' }}>{n.message}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <Card.Text>
                <span className="profile-label">Full Name:</span>
                <span className="profile-value">{user.fullName}</span>
              </Card.Text>
              <Card.Text>
                <span className="profile-label">Date of Birth:</span>
                <span className="profile-value">{user.dateOfBirth}</span>
              </Card.Text>
              <Card.Text>
                <span className="profile-label">Gender:</span>
                <span className="profile-value">{user.gender}</span>
              </Card.Text>
              <Card.Text>
                <span className="profile-label">Address:</span>
                <span className="profile-value">{user.address}</span>
              </Card.Text>

              {/* Test Score Section */}
              {loading && (
                <Card.Text className="profile-score">
                  <span className="profile-label">Survey Total Score:</span>
                  <span className="profile-value">Loading...</span>
                </Card.Text>
              )}

              {error && (
                <Card.Text className="profile-score text-danger">
                  <span className="profile-label">Survey Total Score:</span>
                  <span className="profile-value">Error loading score</span>
                </Card.Text>
              )}

              {!loading && !error && testScore !== null && (
                <Card.Text className="profile-score">
                  <span className="profile-label">Survey Total Score:</span>
                  <span className="profile-value">{testScore}</span>
                </Card.Text>
              )}

              {!loading && !error && testScore === null && (
                <Card.Text className="profile-score">
                  <span className="profile-label">Survey Total Score:</span>
                  <span className="profile-value">No test results found</span>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileUser
