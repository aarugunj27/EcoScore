import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Auth = process.env.REACT_APP_Auth_URL;

function VerifyEmail() {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  const handleVerify = async () => {
    try {
      setStatus("loading");
      const response = await axios.post(
        `${Auth}/verify-email/${verificationToken}`
      );
      if (response.data.message === "Email successfully verified.") {
        setStatus("success");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 p-6">
      <div className="bg-zinc-200 dark:bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
          Verify Your Email
        </h2>
        {status === "idle" && (
          <>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              Please click the button below to verify your email address.
            </p>
            <button
              onClick={handleVerify}
              className="w-full bg-zinc-600 dark:bg-zinc-500 text-zinc-100 px-4 py-2 rounded-lg hover:bg-zinc-500 dark:hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition duration-300"
            >
              Verify Email
            </button>
          </>
        )}
        {status === "loading" && (
          <p className="text-zinc-600 dark:text-zinc-300">Verifying...</p>
        )}
        {status === "success" && (
          <p className="text-green-500">
            Email verified successfully! Redirecting...
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500">Verification failed. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
