"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/EventPage.css"

import { eventData, joinEvent } from "../service/api"

const EventPage = ({ navigateTo }) => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [user, setUser] = useState(null)
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))

    const fetchEvents = async () => {
      setLoading(true)
      const data = await eventData()
      setEvents(Array.isArray(data) ? data : data.events || [])
      setLoading(false)
    }
    fetchEvents()
  }, [])

  const eventTypes = ["all", "Awareness", "Education", "Support"]

  // Updated filtering logic to include both type and search
  const filteredEvents = events.filter((event) => {
    const matchesType = selectedType === "all" || event.type === selectedType
    const matchesSearch = searchQuery === "" || event.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleJoinEvent = async (eventId) => {
    if (!user) {
      alert("Please login to join events")
      return
    }

    console.log("[DEBUG] user object:", user)
    console.log("[DEBUG] eventId:", eventId)

    const accountId = user.accountId !== undefined ? user.accountId : user.account_id
    if (accountId === undefined) {
      alert("User object missing accountId/account_id. Please re-login.")
      return
    }

    try {
      const response = await joinEvent({
        accountId: accountId,
        eventId: eventId,
        status: "joined",
        feedback: "Looking forward to it.",
      })

      if (!response.error) {
        alert("Successfully joined the event!")
      } else {
        alert(`Failed to join event: ${response.error}`)
      }
    } catch (error) {
      console.error("Error joining event:", error)
      alert("An error occurred while joining the event.")
    }
  }

  const handleShareExperience = (eventId) => {
    navigate(`/blogs?event=${eventId}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "Awareness":
        return "type-awareness"
      case "Education":
        return "type-education"
      case "Support":
        return "type-support"
      default:
        return "type-default"
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  if (loading) {
    return (
      <div className="eventpage">
        <div className="loading-container">
          <div className="loading-text">Loading events...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="eventpage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Join Our Community Events</h1>
          <p>
            Connect with others, share experiences, and build a stronger community together in the fight against drug
            addiction.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.getElementById("events-section").scrollIntoView()}>
              Browse Events
            </button>
            <button className="btn-secondary" onClick={() => navigateTo && navigateTo("blogs")}>
              Share Experience
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/event.jpg" alt="Community Events" />
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="filter-section">
        <div className="container">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <button className="search-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {eventTypes.map((type) => (
              <button
                key={type}
                className={`filter-tab ${selectedType === type ? "active" : ""}`}
                onClick={() => setSelectedType(type)}
              >
                {type === "all" ? "All Events" : type}
              </button>
            ))}
          </div>

          {/* Results Count */}
          {(searchQuery || selectedType !== "all") && (
            <div className="results-info">
              <p>
                Found {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedType !== "all" && ` in ${selectedType}`}
              </p>
              {(searchQuery || selectedType !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedType("all")
                  }}
                  className="clear-filters-btn"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Events List Section */}
      <section id="events-section" className="events-section">
        <div className="container">
          <h2>{searchQuery || selectedType !== "all" ? "Search Results" : "Upcoming Events"}</h2>
          {filteredEvents.length === 0 ? (
            <div className="no-events">
              <p>
                {searchQuery
                  ? `No events found matching "${searchQuery}"${selectedType !== "all" ? ` in ${selectedType}` : ""}.`
                  : "No events found for the selected category."}
              </p>
              {searchQuery && (
                <button onClick={clearSearch} className="btn-outline">
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div key={event.event_id} className="event-card">
                  <div className="event-header">
                    <span className={`event-type ${getTypeColor(event.type)}`}>{event.type}</span>
                    <div className="participant-count">
                      <span className="participant-icon">👥</span>
                      {event.participantCount}
                    </div>
                  </div>
                  <h3 className="event-title">{event.name}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-details">
                    <div className="event-detail">
                      <span className="detail-icon">📅</span>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="event-detail">
                      <span className="detail-icon">📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    <button className="btn-primary event-btn" onClick={() => handleJoinEvent(event.eventId)}>
                      Join Event
                    </button>
                    <button className="btn-outline event-btn" onClick={() => handleShareExperience(event.eventId)}>
                      Share Experience
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <p>
            Join our community events and be part of the solution. Together, we can build a stronger, drug-free
            community.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => setSelectedType("all")}>
              View All Events
            </button>
            <button className="btn-outline" onClick={() => navigate("blogs")}>
              Share Your Story
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventPage
