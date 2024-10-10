const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();  // Load environment variables
const sequelize = require('./config/db');  // Import your Sequelize instance

// Import associations
require('./models/associations');

// Middleware
app.use(express.json());

const cors = require('cors');

// Allow requests from your frontend (e.g., http://localhost:3000)
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));



// Import routes
const authRoutes = require('./routes/auth');
const plantRoutes = require('./routes/plants');
const userPlantRoutes = require('./routes/userPlants');

// Use routes
app.use('/auth', authRoutes);
app.use('/plants', plantRoutes);
app.use('/user-plants', userPlantRoutes);

// Sync the database and start the server
(async () => {
  try {
    await sequelize.sync({ alter: true });  // Sync models with database
    console.log('Database synced successfully!');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
})();
