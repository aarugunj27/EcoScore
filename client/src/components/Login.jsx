import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (!values.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!values.password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      axios
        .post("http://localhost:5000/auth/login", values)
        .then((res) => {
          if (res.data.message === "Success") {
            localStorage.setItem(
              "user",
              JSON.stringify({ email: values.email })
            );
            navigate("/"); // Redirect to homepage
            window.location.href = "/"; // Reload to update navbar
          }
        })
        .catch((err) => {
          if (err.response) {
            // Handle invalid email or password errors
            if (err.response.status === 401) {
              const errorMessage = err.response.data.message;
              if (errorMessage === "Email not found") {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  email: "Email not found",
                }));
              } else if (errorMessage === "Invalid password") {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: "Invalid password",
                }));
              }
            } else {
              alert("An error occurred during login.");
            }
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
          Login
        </h2>

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
          Login
        </button>

        <p className="text-center text-zinc-600 dark:text-zinc-300">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-zinc-800 dark:text-zinc-100 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
