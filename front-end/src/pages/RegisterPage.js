"use client"

// src/pages/RegisterPage.js
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaChevronDown } from "react-icons/fa"
import { registerUser } from "../service/api"
import "../styles/RegisterPage.css"
import * as Yup from "yup"

const registerSchema = Yup.object().shape({
  accountname: Yup.string().required("Username is required"), // Đổi từ email thành accountname
  email: Yup.string().email("Invalid email format").nullable(), // Trường email mới, có thể null
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
  fullName: Yup.string().required("Full name is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  gender: Yup.string().oneOf(["Male", "Female"], "Gender is required"),
})

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    accountname: "", // Trường username
    email: "", // Trường email mới
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    address: "",
    gender: "Male",
  })
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [showGenderDropdown, setShowGenderDropdown] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGenderSelect = (gender) => {
    setFormData({
      ...formData,
      gender: gender,
    })
    setShowGenderDropdown(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})
    try {
      await registerSchema.validate(formData, { abortEarly: false })
      const payload = {
        accountname: formData.accountname, // Sử dụng accountname từ form
        email: formData.email || null, // Sử dụng email từ form, hoặc null nếu rỗng
        password: formData.password,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        roleName: "User", // Giả định role mặc định là "User"
      }
      const response = await registerUser(payload)
      if (response.error) {
        setError(response.error)
      } else {
        alert("Registration successful! Please login.")
        navigate("/") // Chuyển hướng về trang đăng nhập
      }
    } catch (err) {
      if (err.inner && err.inner.length > 0) {
        const errors = {}
        err.inner.forEach((e) => {
          errors[e.path] = e.message
        })
        setFieldErrors(errors)
      } else {
        setError(err.message)
      }
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>

          {error && <div className="error-message">{error}</div>}

          <div className="input-box">
            <label htmlFor="accountname">Username</label> {/* Đổi label */}
            <input
              type="text"
              name="accountname" // Đổi name
              id="accountname"
              placeholder="Username" // Đổi placeholder
              value={formData.accountname}
              onChange={handleChange}
              required
            />
            {fieldErrors.accountname && <div className="text-red-500 text-xs mt-1">{fieldErrors.accountname}</div>}
          </div>

          <div className="input-box">
            <label htmlFor="email">Email Address (Optional)</label> {/* Trường email mới */}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && <div className="text-red-500 text-xs mt-1">{fieldErrors.email}</div>}
          </div>

          <div className="input-box">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {fieldErrors.password && <div className="text-red-500 text-xs mt-1">{fieldErrors.password}</div>}
          </div>

          <div className="input-box">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {fieldErrors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</div>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="fullName">FullName: </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {fieldErrors.fullName && <div className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</div>}
          </div>

          <div className="input-box">
            <label htmlFor="dateOfBirth">Date Of Birth: </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            {fieldErrors.dateOfBirth && <div className="text-red-500 text-xs mt-1">{fieldErrors.dateOfBirth}</div>}
          </div>

          <div className="input-box">
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {fieldErrors.address && <div className="text-red-500 text-xs mt-1">{fieldErrors.address}</div>}
          </div>

          <div className="input-box">
            <label htmlFor="gender">Gender: </label>
            <div className="custom-select">
              <div className="select-header" onClick={() => setShowGenderDropdown(!showGenderDropdown)}>
                <span>{formData.gender}</span>
                <FaChevronDown className={`select-arrow ${showGenderDropdown ? "rotated" : ""}`} />
              </div>
              {showGenderDropdown && (
                <div className="select-options">
                  <div
                    className={`select-option ${formData.gender === "Male" ? "selected" : ""}`}
                    onClick={() => handleGenderSelect("Male")}
                  >
                    Male
                  </div>
                  <div
                    className={`select-option ${formData.gender === "Female" ? "selected" : ""}`}
                    onClick={() => handleGenderSelect("Female")}
                  >
                    Female
                  </div>
                </div>
              )}
            </div>
            {fieldErrors.gender && <div className="text-red-500 text-xs mt-1">{fieldErrors.gender}</div>}
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>

        <div className="login-link">
          <p>
            Do you have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
