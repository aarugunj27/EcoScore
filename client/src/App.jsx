import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TrackerPage from "./pages/TrackerPage";
import AboutPage from "./pages/AboutPage";
import NavBar from "./components/NavBar";
import Contact from "./pages/ContactPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Settings from "./pages/settings";
import VerifyEmail from "./components/VerifyEmail";
import EmailConfirmation from "./components/EmailConfirmation";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        <Route
          path="/auth/verify-email/:verificationToken"
          element={<VerifyEmail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
