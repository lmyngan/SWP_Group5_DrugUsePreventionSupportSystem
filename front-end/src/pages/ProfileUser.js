"use client"

import { useEffect, useState } from "react"
import { Card, Container, Row, Col } from "react-bootstrap"
import { getTestScore } from "../service/api"
import "../styles/ProfileUser.css"

const ProfileUser = () => {

    const [user, setUser] = useState(null)
    const [testScore, setTestScore] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [backgroundImage, setBackgroundImage] = useState(null)
    const [backgroundType, setBackgroundType] = useState("gradient") // gradient, image, color

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const userData = JSON.parse(storedUser)
            setUser(userData)

            // Fetch test results if user has accountId
            if (userData.accountId) {
                fetchTestResults(userData.accountId)
            }
        }

        // Load saved profile image
        const savedImage = localStorage.getItem("profileImage")
        if (savedImage) {
            setProfileImage(savedImage)
        }
        // Load saved background
        const savedBackground = localStorage.getItem("backgroundImage")
        const savedBackgroundType = localStorage.getItem("backgroundType")
        if (savedBackground) {
            setBackgroundImage(savedBackground)
        }
        if (savedBackgroundType) {
            setBackgroundType(savedBackgroundType)
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

    const handleBackgroundUpload = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const imageDataUrl = e.target.result
                setBackgroundImage(imageDataUrl)
                setBackgroundType("image")
                localStorage.setItem("backgroundImage", imageDataUrl)
                localStorage.setItem("backgroundType", "image")
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

    const removeBackgroundImage = () => {
        setBackgroundImage(null)
        setBackgroundType("gradient")
        localStorage.removeItem("backgroundImage")
        localStorage.setItem("backgroundType", "gradient")
    }

    const setBackgroundGradient = (gradientType) => {
        setBackgroundType("gradient")
        setBackgroundImage(gradientType)
        localStorage.setItem("backgroundType", "gradient")
        localStorage.setItem("backgroundImage", gradientType)
    }

    const setBackgroundColor = (color) => {
        setBackgroundType("color")
        setBackgroundImage(color)
        localStorage.setItem("backgroundType", "color")
        localStorage.setItem("backgroundImage", color)
    }

    const getBackgroundStyle = () => {
        if (backgroundType === "image" && backgroundImage) {
            return {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }
        } else if (backgroundType === "color" && backgroundImage) {
            return {
                background: backgroundImage,
            }
        } else if (backgroundType === "gradient" && backgroundImage) {
            const gradients = {
                default: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                sunset: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
                forest: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
                fire: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
                sky: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                purple: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                dark: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            }
            return {
                background: gradients[backgroundImage] || gradients.default,
            }
        } else {
            return {
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            }
        }
    }

    if (!user) {
        return (
            <Container className="mt-5">
                <h4>Please login to view your profile.</h4>
            </Container>
        )
    }

    return (
        <Container className="profile-container" style={getBackgroundStyle()}>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    {/* Background Customization Panel */}
                    <Card className="background-panel">
                        <Card.Body>
                            <h5 className="panel-title">🎨 Customize Background</h5>

                            {/* Background Type Selector */}
                            <div className="background-options">
                                <div className="option-group">
                                    <h6>📸 Upload Image</h6>
                                    <div className="upload-background-section">
                                        <label htmlFor="backgroundUpload" className="upload-background-btn">
                                            📷 Upload Background
                                        </label>
                                        <input
                                            id="backgroundUpload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBackgroundUpload}
                                            style={{ display: "none" }}
                                        />
                                        {backgroundType === "image" && backgroundImage && (
                                            <button className="remove-background-btn" onClick={removeBackgroundImage}>
                                                🗑️ Remove
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="option-group">
                                    <h6>🌈 Gradient Backgrounds</h6>
                                    <div className="gradient-options">
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "default" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("default")}
                                            style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}
                                        >
                                            Default
                                        </button>
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "ocean" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("ocean")}
                                            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                                        >
                                            Ocean
                                        </button>
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "sunset" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("sunset")}
                                            style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" }}
                                        >
                                            Sunset
                                        </button>
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "forest" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("forest")}
                                            style={{ background: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)" }}
                                        >
                                            Forest
                                        </button>
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "fire" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("fire")}
                                            style={{ background: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)" }}
                                        >
                                            Fire
                                        </button>
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "sky" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("sky")}
                                            style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
                                        >
                                            Sky
                                        </button>
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "purple" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("purple")}
                                            style={{ background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" }}
                                        >
                                            Purple
                                        </button>
                                        <button
                                            className={`gradient-btn ${backgroundType === "gradient" && backgroundImage === "dark" ? "active" : ""}`}
                                            onClick={() => setBackgroundGradient("dark")}
                                            style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" }}
                                        >
                                            Dark
                                        </button>
                                    </div>
                                </div>

                                <div className="option-group">
                                    <h6>🎨 Solid Colors</h6>
                                    <div className="color-options">
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#f8fafc" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#f8fafc")}
                                            style={{ background: "#f8fafc" }}
                                        ></button>
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#667eea" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#667eea")}
                                            style={{ background: "#667eea" }}
                                        ></button>
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#ff6b6b" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#ff6b6b")}
                                            style={{ background: "#ff6b6b" }}
                                        ></button>
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#4ecdc4" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#4ecdc4")}
                                            style={{ background: "#4ecdc4" }}
                                        ></button>
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#45b7d1" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#45b7d1")}
                                            style={{ background: "#45b7d1" }}
                                        ></button>
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#f9ca24" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#f9ca24")}
                                            style={{ background: "#f9ca24" }}
                                        ></button>
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#6c5ce7" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#6c5ce7")}
                                            style={{ background: "#6c5ce7" }}
                                        ></button>
                                        <button
                                            className={`color-btn ${backgroundType === "color" && backgroundImage === "#2d3436" ? "active" : ""}`}
                                            onClick={() => setBackgroundColor("#2d3436")}
                                            style={{ background: "#2d3436" }}
                                        ></button>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

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
                                    <div className="image-overlay">
                                        <label htmlFor="imageUpload" className="upload-btn">
                                            📷
                                        </label>
                                        {profileImage && (
                                            <button className="remove-btn" onClick={removeProfileImage} title="Remove image">
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                />
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
