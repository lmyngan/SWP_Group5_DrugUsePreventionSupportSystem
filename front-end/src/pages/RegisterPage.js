// src/pages/RegisterPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { registerUser } from '../service/api';
import '../styles/RegisterPage.css';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  email: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm password is required'),
  fullName: Yup.string().required('Full name is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  address: Yup.string().required('Address is required'),
  gender: Yup.string().oneOf(['Male', 'Female'], 'Gender is required'),
});

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
  const [fieldErrors, setFieldErrors] = useState({});
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
    setFieldErrors({});
    try {
      await registerSchema.validate(formData, { abortEarly: false });
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
    } catch (err) {
      if (err.inner && err.inner.length > 0) {
        const errors = {};
        err.inner.forEach(e => {
          errors[e.path] = e.message;
        });
        setFieldErrors(errors);
      } else {
        setError(err.message);
      }
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
            {fieldErrors.email && <div className="text-red-500 text-xs mt-1">{fieldErrors.email}</div>}
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
            {fieldErrors.password && <div className="text-red-500 text-xs mt-1">{fieldErrors.password}</div>}
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
            {fieldErrors.confirmPassword && <div className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</div>}
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
            {fieldErrors.fullName && <div className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</div>}
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
            {fieldErrors.dateOfBirth && <div className="text-red-500 text-xs mt-1">{fieldErrors.dateOfBirth}</div>}
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
            {fieldErrors.address && <div className="text-red-500 text-xs mt-1">{fieldErrors.address}</div>}
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
            {fieldErrors.gender && <div className="text-red-500 text-xs mt-1">{fieldErrors.gender}</div>}
          </div>

          <button type="submit" className='btn'>Register</button>

        </form>

        <div className="login-link">
          <p>
            Do you have an account? <a href="/login">Login</a>
          </p>
        </div>

      </div>

    </div>

  );
};

export default RegisterPage;