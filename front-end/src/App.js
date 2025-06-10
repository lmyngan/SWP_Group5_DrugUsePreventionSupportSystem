// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WhoWeAre from './pages/WhoWeAre';
import Mentor from './pages/Mentor';
import Blog from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/whoweare" element={<WhoWeAre />} />
          
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
