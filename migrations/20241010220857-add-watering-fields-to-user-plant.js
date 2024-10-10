'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserPlants', 'last_watered_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('UserPlants', 'watering_frequency', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 7,
    });
    await queryInterface.addColumn('UserPlants', 'notification_enabled', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn('UserPlants', 'streak_count', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserPlants', 'last_watered_date');
    await queryInterface.removeColumn('UserPlants', 'watering_frequency');
    await queryInterface.removeColumn('UserPlants', 'notification_enabled');
    await queryInterface.removeColumn('UserPlants', 'streak_count');
  },
};

