'use strict';

module.exports= {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'doctors',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected','Completed'),
        defaultValue: 'Pending',
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('appointments');
  },
};