// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('budmark2', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;
