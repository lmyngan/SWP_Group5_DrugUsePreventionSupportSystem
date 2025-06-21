// src/App.js
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WhoWeAre from './pages/WhoWeAre';
import FreeCourse from './pages/FreeCourse';
import Mentor from './pages/Mentor';
import Blog from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Survey from './components/Survey';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/whoweare" element={<WhoWeAre />} />
                <Route path="/freecourse" element={<FreeCourse />} />
                <Route path="/mentor" element={<Mentor />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/survey" element={<Survey />} />
              </Routes>
            </>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
