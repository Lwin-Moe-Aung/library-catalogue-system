'use strict';

/** @type {import('sequelize-cli').Migration} */

const { DataBaseTableNames } = require('../const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(DataBaseTableNames.AUTHOR, [
      {
        first_name: 'John',
        last_name: 'Doe',
        full_name: 'John Doe',
        gender: 'male',
        date_of_birth: new Date('1990-01-01'),
        nationality: 'American',
        email: 'john.doe@example.com',
        website: 'https://www.johndoe.com',
        biography: 'A famous author',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'George',
        last_name: 'Orwell',
        full_name: 'George Orwell',
        gender: 'male',
        date_of_birth: new Date('1903-01-01'),
        nationality: 'American',
        email: 'george.orwel@example.com',
        website: 'https://www.georgeorwel.com',
        biography: 'A famous author',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Monica ',
        last_name: 'Ali',
        full_name: 'Monica Ali',
        gender: 'female',
        date_of_birth: new Date('1903-01-01'),
        nationality: 'American',
        email: 'monicaali@example.com',
        website: 'https://www.monicaali.com',
        biography: 'A famous author',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add more seed data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(DataBaseTableNames.AUTHOR, null, {});
  }
};
