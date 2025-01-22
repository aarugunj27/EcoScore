const { Client } = require("pg"); // Use the pg client for PostgreSQL
require("dotenv").config();

// Set up the database connection using pg
const db = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the PostgreSQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL!");
});

// Create the tables (login and eco_scores) if they don't exist
const createTables = () => {
  const createLoginTableQuery = `
    CREATE TABLE IF NOT EXISTS login (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isVerified BOOLEAN DEFAULT FALSE,
      verificationToken VARCHAR(32)
    );
  `;

  const createEcoScoreTableQuery = `
    CREATE TABLE IF NOT EXISTS eco_scores (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      score FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES login(id) ON DELETE CASCADE
    );
  `;

  db.query(createLoginTableQuery, (err) => {
    if (err) {
      console.error("Error creating login table:", err);
    } else {
      console.log("Login table setup complete.");
    }
  });

  db.query(createEcoScoreTableQuery, (err) => {
    if (err) {
      console.error("Error creating eco score table:", err);
    } else {
      console.log("User eco scores table setup complete.");
    }
  });
};

// Call the function to create tables
createTables();

module.exports = db;
