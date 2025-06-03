// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">DrugsCare</div>

      <ul className="nav-links">
        <li><a href="#introduction">Who we are?</a></li>
        <li><a href="#course">Free Courses</a></li>
        <li><a href="#baocao">Mentor</a></li>
        <li><a href="#Blog">Blog</a></li>
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
