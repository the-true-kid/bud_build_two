const User = require('./User');
const Plant = require('./Plant');
const UserPlant = require('./UserPlant');

// Define associations
User.hasMany(UserPlant, { foreignKey: 'user_id' });
UserPlant.belongsTo(User, { foreignKey: 'user_id' });

Plant.hasMany(UserPlant, { foreignKey: 'plant_id' });
UserPlant.belongsTo(Plant, { foreignKey: 'plant_id' });

module.exports = { User, Plant, UserPlant };
