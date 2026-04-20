'use strict';
module.exports ={
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      password:{
         type:Sequelize.STRING
      },
      specialization: {
        type: Sequelize.STRING,
      },

       experience:{
        type:Sequelize.STRING,
        allowNull:false
      },

      fees: {
        type: Sequelize.INTEGER,
      },

      slots: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('doctors');
  },
};