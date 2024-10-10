const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import your Sequelize instance

const Plant = sequelize.define('Plant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  water_intervals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  care_info: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,  // Adds created_at and updated_at fields
});

module.exports = Plant;
