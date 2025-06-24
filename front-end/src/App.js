"use client"

import { useState, useEffect } from "react"
import "./App.css"

// Import components
import Navbar from "./components/Navbar"

// Import pages
import HomePage from "./pages/HomePage"
import WhoWeAre from "./pages/WhoWeAre"
import FreeCourse from "./pages/FreeCourse"
import Mentor from "./pages/Mentor"
import Event from "./pages/EventPage"
import Login from "./pages/LoginPage"
import Register from "./pages/RegisterPage"
import AddPost from "./pages/AddPost"
import Survey from "./pages/Survey"

const App = () => {
  // State để quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState("home")

  // Lấy trang từ URL khi component mount
  useEffect(() => {
    const path = window.location.pathname
    const page = path.substring(1) || "home" // Bỏ dấu "/" đầu tiên
    setCurrentPage(page)

    // Lắng nghe thay đổi URL
    const handlePopState = () => {
      const newPath = window.location.pathname
      const newPage = newPath.substring(1) || "home"
      setCurrentPage(newPage)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Hàm điều hướng trang
  const navigateTo = (page) => {
    setCurrentPage(page)
    window.history.pushState({}, "", `/${page === "home" ? "" : page}`)
  }

  // Hàm render trang dựa trên currentPage
  const renderPage = () => {
    switch (currentPage) {
      case "home":
      case "":
        return <HomePage />
      case "whoweare":
        return <WhoWeAre />
      case "freecourse":
        return <FreeCourse />
      case "mentor":
        return <Mentor />
      case "event":
        return <Event />
      case "survey":
        return <Survey />
      case "login":
        return <Login />
      case "register":
        return <Register />
      case "addpost":
        return <AddPost />
      default:
        return <HomePage /> // Fallback về trang chủ
    }
  }

  return (
    <div className="app">
      {/* Navbar - hiển thị trên tất cả trang trừ login */}
      {currentPage !== "login" && <Navbar navigateTo={navigateTo} currentPage={currentPage} />}

      {/* Main content */}
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}

export default App
