// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import '../styles/LoginPage.css';
import { loginUser, getUserById, loginWithGoogle } from '../service/api';

const LoginPage = () => {
  const [accountname, setAccountname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const showModal = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { accountname, password };
      const response = await loginUser(credentials);

      if (response?.token) {
        localStorage.setItem('token', response.token);
        const user = await getUserById(response.accountId);
        localStorage.setItem('user', JSON.stringify(user));

        localStorage.setItem('loginMessage', 'Login successful!');
        if (user.roleId === 4) {
          window.location.href = '/';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        showModal(response.message || 'Login failed!');
      }
    } catch (error) {
      console.error("Login error:", error);
      showModal('Login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <label htmlFor="title">Email/Username</label>
            <input
              type="text"
              id="accountname"
              placeholder="Account Name"
              value={accountname}
              onChange={(e) => setAccountname(e.target.value)}
              required />
          </div>

          <div className="input-box">
            <label htmlFor="title">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>

          <button type="submit" className='btn'>Login</button>
        </form>
        <div className="register-link">
  <p>Don't have an account? <a href="/register">Register</a></p>
</div>
      </div>
    </div>
  );
};

export default LoginPage;