const sequelize = require('./config/database');  // Assuming you have your Sequelize instance here
const Plant = require('./models/Plant');  // Adjust path if necessary

const plants = [
  {
    name: 'Monstera',
    water_intervals: 7,
    care_info: 'Water once a week, place in indirect sunlight.'
  },
  {
    name: 'Snake Plant',
    water_intervals: 14,
    care_info: 'Water every two weeks, low light is fine.'
  },
  {
    name: 'Aloe Vera',
    water_intervals: 21,
    care_info: 'Water every 3 weeks, prefers bright light.'
  },
  {
    name: 'Peace Lily',
    water_intervals: 5,
    care_info: 'Water when soil is dry, indirect sunlight.'
  },
  {
    name: 'Fiddle Leaf Fig',
    water_intervals: 10,
    care_info: 'Water when the top inch of soil is dry, bright light.'
  }
];

(async () => {
  try {
    await sequelize.sync();  // Ensure the database and tables are synced
    await Plant.bulkCreate(plants);  // Insert multiple plants
    console.log('Plants added successfully!');
    process.exit();
  } catch (error) {
    console.error('Error adding plants:', error);
    process.exit(1);
  }
})();
