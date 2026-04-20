'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('doctors', [
      {
        name: "Dr. Richard James",
        email: "richard@gmail.com",
        password: await bcrypt.hash("Richard@12345", 10),
        specialization: "General physician",
        experience: "4 year",
        fees: 50,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "3:00", "4.00", "6.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc1.png'
      },
      {
        name: "Dr. Emily Larson",
        email: "emily@gmail.com",
        password: await bcrypt.hash("Emily@12345", 10),
        specialization: "Gynecologist",
        experience: "3 year",
        fees: 60,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "3:00", "5.00", "7.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc2.png'
      },
      {
        name: "Dr. Sarah Patel",
        email: "sarah@gmail.com",
        password: await bcrypt.hash("Sarah@12345", 10),
        specialization: "Dermatologist",
        experience: "1 year",
        fees: 30,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "4:00", "6.00", "8.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc3.png'
      },
      {
        name: "Dr. Christopher Lee",
        email: "lee@gmail.com",
        password:await bcrypt.hash("Lee@12345", 10),
        specialization: " Pediatricians",
        experience: "2 year",
        fees: 40,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "4:00", "6.00", "7.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc4.png'
      },
      {
        name: "Dr. Jennifer Garcia",
        email: "jennifer@gmail.com",
        password:await bcrypt.hash("Jennifer@12345", 10),
        specialization: " Neurologist",
        experience: "4 year",
        fees: 50,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "4:00", "6.00", "9.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc5.png'
      },
      {
        name: "Dr. Andrew Williams",
        email: "andrew@gmail.com",
        password:await bcrypt.hash("Andrew@12345", 10),
        specialization: "Cardiologist",
        experience: "4 year",
        fees: 50,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "4:00", "6.00", "8.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc6.png'
      },
      {
        name: "Dr. Christopher Davis",
        email: "devis@gmail.com",
        password:await bcrypt.hash("Davis@12345", 10),
        specialization: " Physiotherapist",
        experience: "4 year",
        fees: 50,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "4:00", "6.00", "8.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc7.png'
      },
      {
        name: "Dr. Timothy White",
        email: "timothy@gmail.com",
        password:await bcrypt.hash("Timothy@12345", 10),
        specialization: "Ayurvedic",
        experience: "3 year",
        fees: 60,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "3:00", "5.00", "7.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc8.png'
      },
      {
        name: "Dr. Ava Mitchell",
        email: "mitchell@gmail.com",
        password:await bcrypt.hash("Mitchell@12345", 10),
        specialization: "Ophthalmologist",
        experience: "1 year",
        fees: 30,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "4:00", "6.00", "8.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc9.png'
      },
      {
        name: "Dr. Jeffrey King",
        email: "jeffrey@gmail.com",
        password:await bcrypt.hash("Jeffrey@12345", 10),
        specialization: "Optometrist",
        experience: "2 year",
        fees: 40,
        slots: JSON.stringify(["10:00", "11:00", "12:00", "2:00", "4:00", "6.00", "8.00"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        image:'/uploads/doc10.png'
      },

    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('doctors', null, {});
    await queryInterface.sequelize.query('ALTER TABLE doctors AUTO_INCREMENT = 1');

  }
};
