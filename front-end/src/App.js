"use client"

import { useState, useEffect } from "react"
import { eventData } from "./service/api.js";
import "./App.css"
import Footer from "./components/Footer";

// Import components
import Navbar from "./components/Navbar"
import DashBoardSidebar from "./components/DashBoardSidebar"

// Import pages
import HomePage from "./pages/HomePage"
import WhoWeAre from "./pages/WhoWeAre"
import FreeCourse from "./pages/FreeCourse"
import Mentor from "./pages/Mentor"
import Event from "./pages/EventPage"
import Login from "./pages/LoginPage"
import Register from "./pages/RegisterPage"
import ProfileUser from "./pages/ProfileUser"
import Survey from "./pages/Survey"
import DashBoard from "./pages/DashBoard"
import BookAppointment from "./pages/BookAppointment"
import Account from "./pages/Account"
import BlogPage from "./pages/BlogPage"
import ManageConsultant from "./pages/ManageConsultant"
import ManageEvent from "./pages/ManageEvent"
import ManageBlog from "./pages/ManageBlog"
import Report from "./pages/Report"
import CalendarPage from "./pages/CalendarPage"

import { GoogleOAuthProvider } from '@react-oauth/google';
import ManageSchedule from "./pages/ManageSchedule"
import NotFound from "./pages/NotFound"



const App = () => {
  // State để quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState("home");
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);

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

    const fetchEvents = async () => {
      const data = await eventData();
      const eventList = Array.isArray(data) ? data : data.events || [];
      // Sắp xếp và lấy 3 event mới nhất
      const sortedEvents = [...eventList].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
      setEvents(eventList);
      setFeaturedEvents(sortedEvents.slice(0, 3));
    };
    fetchEvents();

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
      case "dashboard":
        return <DashBoard />
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
      case "blogs":
        return <BlogPage />
      case "login":
        return <Login />
      case "register":
        return <Register />
      case "calendar":
        return <CalendarPage />
      case "profile":
        return <ProfileUser />
      case "manage-consultant":
        return <ManageConsultant />
      case "manage-bookappointment":
        return <BookAppointment />
      case "manage-schedule":
        return <ManageSchedule />
      case "manage-event":
        return <ManageEvent />
      case "manage-blog":
        return <ManageBlog />
      case "manage-account":
        return <Account />
      case "report":
        return <Report />
      case "not-found":
        return <NotFound navigateTo={navigateTo} />

      default:
        return <NotFound /> // Redirect to 404 page for non-existent routes
    }
  }

  return (

    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="app">
        {/*Member Navbar*/}
        {!(currentPage === "dashboard" || currentPage.startsWith("manage-") || currentPage === "report") && (
          <Navbar navigateTo={navigateTo} currentPage={currentPage} />
        )}

        {/*Admin Dashboard*/}
        {(currentPage === "dashboard" || currentPage.startsWith("manage-") || currentPage === "report") && (
          <DashBoardSidebar navigateTo={navigateTo} currentPage={currentPage} />
        )}

        {/* Main content */}
        <main className="main-content">{renderPage()}</main>
        {/* Footer luôn hiển thị ở mọi trang */}
        <Footer featuredEvents={featuredEvents} navigateTo={navigateTo} />
      </div>
    </GoogleOAuthProvider>

  )
}

export default App
