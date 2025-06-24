// src/pages/LoginPage.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../service/api';
import './LoginPage.css';

const LoginPage = () => {
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { accountName, password });

    try {
      const response = await authApi.login({
        accountname: accountName,
        password: password
      });
      console.log('Login successful:', response);

      // Lưu token vào localStorage
      localStorage.setItem('token', response.token);

      // Tạo user object và lưu vào localStorage
      const user = {
        accountName: accountName,
        password: password,
        // Thêm các thông tin user khác nếu cần
      };
      localStorage.setItem('user', JSON.stringify(user));

      // Chuyển hướng sau khi đăng nhập thành công

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