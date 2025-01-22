import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = process.env.REACT_APP_Auth_URL;

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password validation regex

    if (!values.name) {
      tempErrors.name = "Name is required";
    }

    if (!values.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!values.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordPattern.test(values.password)) {
      tempErrors.password =
        "Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      axios
        .post(`${Auth}/signup`, values)
        .then((res) => {
          if (res.data.message === "User created, verification email sent") {
            // Store user email temporarily
            localStorage.setItem(
              "unverifiedUser",
              JSON.stringify({ email: values.email })
            );
            // Show verification prompt
            navigate("/email-confirmation"); // Navigate to a page prompting email verification
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email already exists",
            }));
          } else {
            alert("An error occurred during signup.");
          }
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 p-8">
      <form
        className="bg-zinc-200 dark:bg-zinc-800 p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100 text-center mb-6">
          Sign Up
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-zinc-700 dark:text-zinc-200 mb-2"
          >
            *Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
            placeholder="Your name"
            onChange={handleInput}
            name="name"
            value={values.name}
          />
          {errors?.name && <span className="text-red-500">{errors.name}</span>}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-zinc-700 dark:text-zinc-200 mb-2"
          >
            *Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
            placeholder="Your email"
            onChange={handleInput}
            name="email"
            value={values.email}
          />
          {errors?.email && (
            <span className="text-red-500">{errors.email}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-zinc-700 dark:text-zinc-200 mb-2"
          >
            *Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
            placeholder="Your password"
            onChange={handleInput}
            name="password"
            value={values.password}
          />
          {errors?.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-600 dark:bg-zinc-500 text-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-500 dark:hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-zinc-600 dark:text-zinc-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-zinc-800 dark:text-zinc-100 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
