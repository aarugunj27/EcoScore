import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = import.meta.env.VITE_Auth_URL;

function Settings() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!values.password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      axios
        .post(`${Auth}/delete-account`, values)
        .then((res) => {
          setLoading(false);
          console.log("API Response:", res.data);
          if (res.status === 200) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
            window.location.href = "/";
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error("Error:", err.response || err);
          if (err.response) {
            if (err.response.status === 401) {
              const errorMessage = err.response.data.message;
              setErrors((prevErrors) => ({
                ...prevErrors,
                [errorMessage.includes("Email") ? "email" : "password"]:
                  errorMessage,
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                general: "An error occurred while deleting.",
              }));
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
          Delete Account
        </h2>

        {errors.general && (
          <span className="text-red-500">{errors.general}</span>
        )}

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
          className="w-full py-2 bg-zinc-900 dark:bg-zinc-500 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-400 transition duration-300"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
