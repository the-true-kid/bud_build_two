const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config(); // Load environment variables
const pool = require('./config/db'); // Import the database connection pool
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' })); // Allow requests from the frontend

// Import routes
const authRoutes = require('./routes/auth');
const plantRoutes = require('./routes/plants');
const userPlantRoutes = require('./routes/userPlants');

// Use routes
app.use('/auth', authRoutes);
app.use('/plants', plantRoutes);
app.use('/user-plants', userPlantRoutes);

// Test the database connection before starting the server
(async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully!');
    client.release(); // Release the connection back to the pool

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit with a failure code
  }
})();
