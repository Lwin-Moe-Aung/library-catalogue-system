'use strict';
const { DataBaseTableNames } = require('../const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(DataBaseTableNames.STUDENT, [
      {
        first_name: 'John',
        last_name: 'Doe',
        gender: 'male',
        date_of_birth: new Date('1995-05-15'),
        email: 'john.doe@example.com',
        contact_number: '1234567890',
        address: '123 Main Street, Cityville',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        gender: 'female',
        date_of_birth: new Date('1998-08-20'),
        email: 'jane.smith@example.com',
        contact_number: '9876543210',
        address: '456 Oak Avenue, Townsville',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add three more student records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(DataBaseTableNames.STUDENT, null, {});
  },
};
