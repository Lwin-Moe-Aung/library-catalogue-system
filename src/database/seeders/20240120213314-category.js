'use strict';
const { DataBaseTableNames } = require('../const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(DataBaseTableNames.CATEGORY, [
      {
        name: 'Fiction',
        published: true,
        slug: 'fiction',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Mystery',
        published: true,
        slug: 'mystery',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Science Fiction',
        published: true,
        slug: 'science-fiction',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'History',
        published: true,
        slug: 'history',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Self-Help',
        published: true,
        slug: 'self-help',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add more categories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(DataBaseTableNames.CATEGORY, null, {});
  },
};
