'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('appointments', 'status', {
      type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected', 'Completed'),
      allowNull: false,
      defaultValue: 'Pending',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('appointments', 'status', {
      type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected'),
      allowNull: false,
      defaultValue: 'Pending',
    });
  },
};