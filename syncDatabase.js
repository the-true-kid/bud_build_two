const sequelize = require('./config/database');
const User = require('./models/User');
const Plant = require('./models/Plant');
const UserPlant = require('./models/UserPlant');

(async () => {
  try {
    // Sync all models with the database (this creates the tables)
    await sequelize.sync({ force: true });  // Use force:true to drop and recreate tables
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing the database:', error);
  } finally {
    await sequelize.close();
  }
})();
