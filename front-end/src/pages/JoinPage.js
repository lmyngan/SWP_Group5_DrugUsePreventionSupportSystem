"use client"

import React, { useState, useEffect } from 'react'
import "../styles/JoinPage.css"
import LoginStatus from "../components/LoginStatus"
import Footer from "../components/Footer"

const JoinPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [hasJoined, setHasJoined] = useState(false)
  const [joinCount, setJoinCount] = useState(1247) // Số lượng người tham gia hiện tại
  const [participants, setParticipants] = useState([])
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Specialist",
      rating: 5,
      comment: "This community has been incredibly helpful in my work with patients. The resources and support are excellent.",
      date: "March 15, 2024",
      avatar: "👩‍⚕️"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Parent",
      rating: 5,
      comment: "As a parent, I found the educational content and community support invaluable. Thank you for this platform!",
      date: "March 12, 2024",
      avatar: "👨‍👧‍👦"
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Teacher",
      rating: 4,
      comment: "Great resources for educators. The prevention programs and materials are very comprehensive.",
      date: "March 10, 2024",
      avatar: "👩‍🏫"
    }
  ])
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: ""
  })
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  // Check login status và join status
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedJoinStatus = localStorage.getItem("hasJoined")
    const storedParticipants = localStorage.getItem("participants")
    const storedFeedbacks = localStorage.getItem("feedbacks")
    const storedJoinCount = localStorage.getItem("joinCount")

    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }

    if (storedJoinStatus === "true") {
      setHasJoined(true)
    }

    if (storedParticipants) {
      setParticipants(JSON.parse(storedParticipants))
    }

    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks))
    }

    if (storedJoinCount) {
      setJoinCount(parseInt(storedJoinCount))
    }
  }, [])

  // Handle join community
  const handleJoinCommunity = () => {
    if (!isLoggedIn) {
      window.location.href = "/login"
      return
    }

    const newParticipant = {
      id: Date.now(),
      name: user.name,
      role: user.role,
      joinDate: new Date().toLocaleDateString(),
      avatar: getRoleAvatar(user.role)
    }

    const updatedParticipants = [...participants, newParticipant]
    const newCount = joinCount + 1

    setParticipants(updatedParticipants)
    setJoinCount(newCount)
    setHasJoined(true)

    // Save to localStorage
    localStorage.setItem("participants", JSON.stringify(updatedParticipants))
    localStorage.setItem("joinCount", newCount.toString())
    localStorage.setItem("hasJoined", "true")

    // Show success message
    alert("🎉 Welcome to DrugsCare Community! You have successfully joined.")
  }

  // Handle leave community
  const handleLeaveCommunity = () => {
    const updatedParticipants = participants.filter(p => p.name !== user.name)
    const newCount = Math.max(0, joinCount - 1)

    setParticipants(updatedParticipants)
    setJoinCount(newCount)
    setHasJoined(false)

    // Save to localStorage
    localStorage.setItem("participants", JSON.stringify(updatedParticipants))
    localStorage.setItem("joinCount", newCount.toString())
    localStorage.setItem("hasJoined", "false")

    alert("You have left the community. We hope to see you again!")
  }

  // Handle feedback submission
  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    
    if (!isLoggedIn) {
      alert("Please login to submit feedback")
      return
    }

    if (!newFeedback.comment.trim()) {
      alert("Please enter your feedback comment")
      return
    }

    const feedback = {
      id: Date.now(),
      name: user.name,
      role: user.role,
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      date: new Date().toLocaleDateString(),
      avatar: getRoleAvatar(user.role)
    }

    const updatedFeedbacks = [feedback, ...feedbacks]
    setFeedbacks(updatedFeedbacks)
    setNewFeedback({ rating: 5, comment: "" })
    setShowFeedbackForm(false)

    // Save to localStorage
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks))

    alert("Thank you for your feedback! 🙏")
  }

  // Get role avatar
  const getRoleAvatar = (role) => {
    const avatars = {
      "Specialist": "👨‍⚕️",
      "Teacher": "👩‍🏫",
      "Parent": "👨‍👧‍👦",
      "Student": "👨‍🎓",
      "University Student": "👩‍🎓",
      "Community": "👥"
    }
    return avatars[role] || "👤"
  }

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="join-page">
      {/* Header */}
      <section className="join-header">
        <div className="container">
          <div className="join-header-content">
            <h1>🤝 Join DrugsCare Community</h1>
            <p>Connect with professionals, parents, and individuals committed to drug prevention and harm reduction</p>
            
            <div className="community-stats">
              <div className="stat-item">
                <div className="stat-number">{joinCount.toLocaleString()}</div>
                <div className="stat-label">Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Specialists</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Resources</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Feedbck Section */}
      <section className="feedback-section">
        <div className="container">
          <div className="feedback-header">
            <h2>💬 Community Feedback</h2>
            <p>What our members say about DrugsCare Community</p>
            {isLoggedIn && (
              <button 
                className="btn-add-feedback"
                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
              >
                {showFeedbackForm ? "❌ Cancel" : "✍️ Add Feedback"}
              </button>
            )}
          </div>

          {/* Feedback Form */}
          {showFeedbackForm && (
            <div className="feedback-form-container">
              <form className="feedback-form" onSubmit={handleSubmitFeedback}>
                <h3>Share Your Experience</h3>
                
                <div className="rating-input">
                  <label>Your Rating:</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= newFeedback.rating ? 'active' : ''}`}
                        onClick={() => setNewFeedback({...newFeedback, rating: star})}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                <div className="comment-input">
                  <label>Your Feedback:</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    placeholder="Share your thoughts about the DrugsCare community..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    📤 Submit Feedback
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => setShowFeedbackForm(false)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Feedback List */}
          <div className="feedback-list">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <div className="feedback-user">
                    <span className="feedback-avatar">{feedback.avatar}</span>
                    <div className="feedback-user-info">
                      <div className="feedback-name">{feedback.name}</div>
                      <div className="feedback-role">{feedback.role}</div>
                    </div>
                  </div>
                  <div className="feedback-meta">
                    <div className="feedback-rating">
                      {renderStars(feedback.rating)}
                    </div>
                    <div className="feedback-date">{feedback.date}</div>
                  </div>
                </div>
                <div className="feedback-content">
                  <p>{feedback.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Status Component */}
      <LoginStatus />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default JoinPage