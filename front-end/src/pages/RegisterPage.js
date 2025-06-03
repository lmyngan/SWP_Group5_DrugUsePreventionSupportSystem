// src/pages/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form className="register-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Register</button>
          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default RegisterPage;

/*<div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Register Page</h2>
      <p>This is where the registration form will be.</p>
    </div> */