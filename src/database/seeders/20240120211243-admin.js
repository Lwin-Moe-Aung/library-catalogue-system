'use strict';
const bcrypt = require( "bcryptjs");

/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(DataBaseTableNames.ADMIN, [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('1234567', 7), // Replace with the actual hashed password
        role: 'admin',
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        last_login: new Date(),
      },
      {
        name: 'Sub Admin',
        email: 'sub-admin@gmail.com',
        password: bcrypt.hashSync('1234567', 7), // Replace with the actual hashed password
        role: 'sub-admin',
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        last_login: new Date(),
      },
      // Add more seed data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(DataBaseTableNames.ADMIN, null, {});
  }
};