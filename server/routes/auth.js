const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/db");
const { sendVerificationEmail } = require("./email");
const crypto = require("crypto");

const router = express.Router();

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const checkUserSql = "SELECT * FROM login WHERE email = ?";
  db.query(checkUserSql, [email], (err, results) => {
    if (err) {
      console.log("Database error during user check:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.log("Error hashing password:", err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(16).toString("hex");

      // Create user with isVerified flag set to false (0)
      const insertUserSql =
        "INSERT INTO login (name, email, password, isVerified, verificationToken) VALUES (?, ?, ?, ?, ?)";
      db.query(
        insertUserSql,
        [name, email, hashedPassword, 0, verificationToken],
        (err) => {
          if (err) {
            console.log("Error creating user:", err);
            return res.status(500).json({ message: "Error creating user" });
          }

          // Send email verification
          sendVerificationEmail(email, verificationToken);

          return res
            .status(201)
            .json({ message: "User created, verification email sent" });
        }
      );
    });
  });
});

router.post("/verify-email/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;

  try {
    // Query to find the user by the verification token
    db.query(
      "SELECT * FROM login WHERE verificationToken = ?",
      [verificationToken],
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error." });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "Invalid verification link." });
        }

        // Update the user’s isVerified field to 1 (true)
        db.query(
          "UPDATE login SET isVerified = 1 WHERE verificationToken = ?",
          [verificationToken],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating verification status:", updateErr);
              return res
                .status(500)
                .json({ message: "Error updating status." });
            }

            return res
              .status(200)
              .json({ message: "Email successfully verified." });
          }
        );
      }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log("Database error during login:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log("Error comparing passwords:", err);
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Login successful, return user data (excluding password)
      const { password, ...userData } = user;
      return res.status(200).json({ message: "Success", userData });
    });
  });
});

module.exports = router;
