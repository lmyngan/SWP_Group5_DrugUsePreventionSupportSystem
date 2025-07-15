"use client"

import { useEffect, useState } from "react"
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
  const [showModal, setShowModal] = useState(false);

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
              {notifications.length > 0 && (
                <Card.Text className="profile-notification">
                  <span
                    className="profile-label"
                    style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
                    onClick={() => setShowModal(true)}
                  >
                    You have {notifications.length} notification{notifications.length > 1 ? "s" : ""}.
                  </span>
                </Card.Text>
              )}

              {/* Custom Notification Modal */}
              {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                  <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
                    <h2 style={{ marginBottom: 16 }}>Notifications</h2>
                    {notifications.length === 0 ? (
                      <div>No notifications found.</div>
                    ) : (
                      <ul className="notification-list">
                        {notifications.map((n, idx) => (
                          <li key={n.notificationId || idx} className="notification-item">
                            <strong>{n.message}</strong>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div style={{ marginTop: 24, textAlign: 'right' }}>
                      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
