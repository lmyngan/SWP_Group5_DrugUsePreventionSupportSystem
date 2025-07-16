// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/LoginPage.css';
import { loginUser, getUserById, loginWithGoogle } from '../service/api';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [accountname, setAccountname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { accountname, password };
      const response = await loginUser(credentials);

      if (response?.token) {
        localStorage.setItem('token', response.token);
        const decoded = jwtDecode(response.token);
        const user = await getUserById(response.accountId);
        localStorage.setItem('user', JSON.stringify(user));

        alert('Login successful!');

        if (user.roleId === 4) {
          window.location.href = '/';
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        alert(response.message || 'Login failed!');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Login failed!');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      const googleLoginResult = await loginWithGoogle(credential);

      if (googleLoginResult?.token) {
        localStorage.setItem('token', googleLoginResult.token);
        const user = jwtDecode(googleLoginResult.token);
        console.log("Google login as:", user.FullName || user.accountname);

        alert("Login with Google successful!");
        navigate('/');
      } else {
        alert(googleLoginResult?.error || "Google login failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="text"
              id="accountname"
              placeholder="Account Name"
              value={accountname}
              onChange={(e) => setAccountname(e.target.value)}
              required />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
            </svg>
          </div>

          <div className='social-login'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={handleGoogleLoginSuccess}
              onError={() => alert("Google login failed.")}
            />
          </div>

          <div className="forgot-password">
            <label><input type="checkbox" /> Remember Me</label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className='btn'>Login</button>
        </form>

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;