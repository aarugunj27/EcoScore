import React from "react";
import { Link } from "react-router-dom";

function EmailConfirmation() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 p-8">
      <div className="bg-zinc-200 dark:bg-zinc-800 p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100 text-center mb-6">
          Verify Your Email
        </h2>
        <p className="text-center text-zinc-700 dark:text-zinc-300">
          We've sent a verification link to your email. Please check your inbox
          and follow the link to complete the verification process.
        </p>
        <Link
          to="/login"
          className="block w-full bg-zinc-600 dark:bg-zinc-500 text-zinc-100 dark:text-zinc-900 px-4 py-2 text-center rounded-lg hover:bg-zinc-500 dark:hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default EmailConfirmation;
