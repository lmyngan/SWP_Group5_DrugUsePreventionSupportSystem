// src/pages/RegisterPage.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../service/api';
import '../styles/RegisterPage.css';
import { Modal, Button } from 'react-bootstrap';

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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      const response = await authApi.register(formData);
      console.log('Registration successful:', response);
      setShowModal(true);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join('\n')
        : error.response?.data?.message
        || error.response?.data?.title
        || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          {error && <div className="error-message">{error}</div>}
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Email/Username"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required />
          </div>
          <div className="input-box">
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required />
          </div>
          <div className="input-box">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button type="submit" className='btn'>Register</button>
        </form>
        <div className="login-link">
          <p>
            Do you have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {/* Modal thông báo đăng ký thành công */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Registration successful! Please login.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterPage;

/*<div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Register Page</h2>
      <p>This is where the registration form will be.</p>
    </div> */