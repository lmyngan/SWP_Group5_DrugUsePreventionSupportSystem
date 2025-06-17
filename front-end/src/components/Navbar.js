// src/components/Navbar.js
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">DrugsCare</Link>
      </div>

      <ul className="nav-links">
        <li><a href="/introduction">Who we are?</a></li>
        <li><a href="/course">Free Courses</a></li>
        <li><a href="/baocao">Mentor</a></li>
        <li><a href="/Blog">Blog</a></li>
      </ul>

      <div className="right-section">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-box" />
          <button type="submit" className="search-button"><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className="auth-buttons">
          <a href="/login" className="auth-link">Login</a>
          <a href="/register" className="auth-link">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
