// src/pages/RegisterPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { registerUser } from '../service/api';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    gender: 'Male'
  });
  const [error, setError] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenderSelect = (gender) => {
    setFormData({
      ...formData,
      gender: gender
    });
    setShowGenderDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.email.trim()) {
      setError('Username is required');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.fullName || !formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.dateOfBirth) {
      setError('Date of birth is required');
      return;
    }

    try {
      const payload = {
        accountname: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        roleName: "User"
      };
      const response = await registerUser(payload);
      if (response.error) {
        setError(response.error);
      } else {
        alert('Registration successful! Please login.');
        window.location.href = "/";
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <form className="register-form" onSubmit={handleSubmit}>

          <h1>Register</h1>

          {error && <div className="error-message">{error}</div>}


          <div className="input-box">
            <label htmlFor="title">Email/Username</label>
            <input
              type="text"
              name="email"
              placeholder="Email/Username"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>

          <div className="input-box">
            <label htmlFor="title">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required />
          </div>

          <div className="input-box">
            <label htmlFor="title">Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required />
          </div>

          <div className="input-box">
            <label htmlFor="title">FullName: </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required />
          </div>

          <div className="input-box">
            <label htmlFor="title">Date Of Birth: </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="title">Address: </label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required />
          </div>

          <div className="input-box">
            <label htmlFor="title">Gender: </label>
            <div className="custom-select">
              <div
                className="select-header"
                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
              >
                <span>{formData.gender}</span>
                <FaChevronDown className={`select-arrow ${showGenderDropdown ? 'rotated' : ''}`} />
              </div>
              {showGenderDropdown && (
                <div className="select-options">
                  <div
                    className={`select-option ${formData.gender === 'Male' ? 'selected' : ''}`}
                    onClick={() => handleGenderSelect('Male')}
                  >
                    Male
                  </div>
                  <div
                    className={`select-option ${formData.gender === 'Female' ? 'selected' : ''}`}
                    onClick={() => handleGenderSelect('Female')}
                  >
                    Female
                  </div>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className='btn'>Register</button>

        </form>

        <div className="login-link">
          <p>
            Do you have an account? <Link to="/login">Login</Link>
          </p>
        </div>

      </div>

    </div>

  );
};

export default RegisterPage;