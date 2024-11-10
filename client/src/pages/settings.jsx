import React, { useState } from "react";
import axios from "axios";

const Settings = ({ email, onAccountDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        "http://localhost:3000/auth/delete-account",
        {
          data: { email },
        }
      );

      if (response.status === 200) {
        alert("Account deleted successfully.");
        onAccountDeleted(); // Callback function to handle account deletion (e.g., redirect or logout)
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-account">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Settings;
