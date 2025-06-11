// src/components/Navbar.js
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">DrugsCare</Link>
      </div>

      <ul className="nav-links">
        <li>
    <Link to="/whoweare">Who we are?</Link>
       </li>
        <li><a href="#course">Free Courses</a></li>
        <li><a href="#baocao">Mentor</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>

      <div className="right-section">
        <input type="text" placeholder="Search..." className="search-box" />
        <div className="auth-buttons">
          <a href="/login" className="auth-link">Login</a>
          <a href="/register" className="auth-link">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
