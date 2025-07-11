// src/pages/LoginPage.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser, getUserById } from '../service/api';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { accountName, password });

    try {
      const response = await loginUser({ accountName, password });
      console.log('Login successful:', response);

      localStorage.setItem('token', response.token);

      const decoded = jwtDecode(response.token);
      console.log("Account: ", decoded);

      const userInfo = await getUserById(decoded.AccountId);

      const user = {
        accountId: decoded.AccountId,
        consultantId: userInfo.consultantId,
        accountName: accountName,
        password: password,
        fullName: decoded.FullName,
        dateOfBirth: decoded.DateOfBirth,
        gender: decoded.Gender,
        address: decoded.Address,
        roleName: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };
      localStorage.setItem('user', JSON.stringify(user));

      // Chuyển hướng sau khi đăng nhập thành công
      if (user.roleName === "User") {
        window.location.href = "/";
      }
      if (user.roleName !== "User") {
        window.location.href = "/dashboard";
      }
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      setError(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <div className="error-message">{error}</div>}

          <div className="input-box">
            <label htmlFor="title">Username: </label>
            <input
              type="text"
              id="accountName"
              placeholder="Username"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />

          </div>

          <div className="input-box">
            <label htmlFor="title">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <div className="forgot-password">
            <label><input type="checkbox" /> Remember Me</label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className='btn'>Login</button>
        </form>

        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;