const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import your Sequelize instance

const UserPlant = sequelize.define('UserPlant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  plant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Plants',
      key: 'id',
    },
  },
  last_watered_date: {
    type: DataTypes.DATE,
    allowNull: true, // Allow it to be null initially if the plant hasn't been watered yet
  },
  watering_frequency: {
    type: DataTypes.INTEGER, // Number of days between watering
    allowNull: false,
    defaultValue: 7, // Default to 7 days if no specific frequency is set
  },
  notification_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  streak_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Initialize with 0 streak count
  },
}, {
  timestamps: true,  // Adds created_at and updated_at fields
});

module.exports = UserPlant;
