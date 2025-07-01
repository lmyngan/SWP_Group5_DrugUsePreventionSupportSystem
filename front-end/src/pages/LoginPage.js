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
        consultantId: userInfo.ConsultantId,
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
            <input
              type="text"
              id="accountName"
              placeholder="Username"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><g fill="none" fill-rzule="evenodd"><path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2ZM8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0Zm9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984Z" /></g></svg>
          </div>

          <div className="input-box">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 344 456"><path fill="currentColor" d="M299 155q17 0 29.5 12.5T341 197v214q0 17-12.5 29.5T299 453H43q-18 0-30.5-12.5T0 411V197q0-17 12.5-29.5T43 155h21v-43q0-44 31.5-75.5T171 5t75 31.5t31 75.5v43h22zM170.5 347q17.5 0 30-12.5T213 304t-12.5-30.5t-30-12.5t-30 12.5T128 304t12.5 30.5t30 12.5zM237 155v-43q0-27-19.5-46.5t-47-19.5T124 65.5T105 112v43h132z" /></svg>
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