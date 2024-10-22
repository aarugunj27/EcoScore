import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import TrackerPage from './pages/TrackerPage';
import TipsPage from './pages/TipsPage';
import AboutPage from './pages/AboutPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
