const mysql = require("mysql");
require("dotenv").config();

// Set up the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
});

// Connect to MySQL and create the database and table
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }

  // Create the database if it doesn't exist
  db.query("CREATE DATABASE IF NOT EXISTS signup", (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }

    // Use the signup database
    db.query("USE signup", (err) => {
      if (err) {
        console.error("Error switching to signup database:", err);
        return;
      }

      // Create the login table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS login (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          isVerified TINYINT DEFAULT 0 CHECK (isVerified IN (0, 1)),
          verificationToken VARCHAR(32)
        );
      `;

      db.query(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating login table:", err);
        } else {
          console.log("Database and login table setup complete.");
        }
      });
    });
  });
});

module.exports = db;
