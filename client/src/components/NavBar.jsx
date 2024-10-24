import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Sun and moon icons for dark mode toggle

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from local storage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Update the document class and local storage when dark mode is toggled
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  return (
    <nav className="w-full z-10 p-4 bg-white dark:bg-zinc-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-zinc-900 dark:text-white hover:opacity-80 transition-opacity"
        >
          Sustainability Tracker
        </Link>

        {/* Nav Links */}
        <ul className="flex space-x-8 text-base font-medium">
          <li>
            <Link
              to="/"
              className="relative text-zinc-900 dark:text-white bg-transparent hover:bg-transparent transition-opacity after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-zinc-900 dark:after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tracker"
              className="relative text-zinc-900 dark:text-white bg-transparent hover:bg-transparent transition-opacity after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-zinc-900 dark:after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Tracker
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative text-zinc-900 dark:text-white bg-transparent hover:bg-transparent transition-opacity after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-zinc-900 dark:after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 flex items-center justify-center bg-zinc-300 dark:bg-zinc-600 rounded-full transition-all duration-300 hover:bg-zinc-400 dark:hover:bg-zinc-500 focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="text-zinc-900 dark:text-white text-xl"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
