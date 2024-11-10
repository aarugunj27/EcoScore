import React, { useState, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  Navbar,
  DarkThemeToggle,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";

import Logo from "../assets/images/logo1.webp";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Function to check localStorage for user data
    const checkLoginStatus = () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(loggedInUser)); // Parse user data
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    // Check login status on mount
    checkLoginStatus();

    // Listen for localStorage changes across tabs/windows
    window.addEventListener("storage", checkLoginStatus);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data on logout
    setIsLoggedIn(false);
    setUserData(null); // Reset user data
    window.location.reload();
  };

  return (
    <Navbar fluid className="bg-zinc-100 dark:bg-zinc-900">
      <Navbar.Brand href="/">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="EcoScore Logo" />
      </Navbar.Brand>
      <>
        {isLoggedIn ? (
          <div className="flex md:order-2">
            <DarkThemeToggle />
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{userData?.name}</span>
                <span className="block truncate text-sm font-medium">
                  {userData?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <div className="flex md:order-2">
            <DarkThemeToggle />
            <Link
              to="/login"
              className="btn bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border-none ml-2"
            >
              Login
            </Link>
          </div>
        )}
      </>
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          className="relative text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-opacity after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-zinc-900 dark:after:bg-zinc-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/about"
          className="relative text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-opacity after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-zinc-900 dark:after:bg-zinc-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
        >
          About
        </Navbar.Link>
        <Navbar.Link
          href="/tracker"
          className="relative text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-opacity after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-zinc-900 dark:after:bg-zinc-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
        >
          Calculator
        </Navbar.Link>
        <Navbar.Link
          href="/contact"
          className="relative text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-opacity after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-zinc-900 dark:after:bg-zinc-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
        >
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
