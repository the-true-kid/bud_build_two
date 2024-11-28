const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a new PostgreSQL client pool
const pool = new Pool({
  user: process.env.DB_USER || 'aaron',       // Database user
  host: process.env.DB_HOST || 'localhost',     // Database host
  database: process.env.DB_NAME || 'budmark2',  // Database name
  password: process.env.DB_PASSWORD || 'password', // Database password
  port: process.env.DB_PORT || 5432,            // Default PostgreSQL port
});

// Test the database connection
(async () => {
  try {
    const client = await pool.connect(); // Acquire a client from the pool
    console.log('Database connected successfully.');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = pool;
