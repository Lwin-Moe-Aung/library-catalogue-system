'use strict';
const { DataBaseTableNames } = require('../const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(DataBaseTableNames.BOOK, [
      {
        title: 'The Great Gatsby',
        isbn: '978-0-7432-7356-5',
        catalog_id: 'ABC123',
        publish_date: new Date('1925-04-10'),
        total_copies: 10,
        available_copies: 10,
        category_id: 1, // Replace with an existing category_id
        author_id: 1,   // Replace with an existing author_id
        language: 'English',
        genre: 'Classic',
        summary: 'A novel by F. Scott Fitzgerald...',
        cover_image_url: 'https://example.com/great-gatsby.jpg',
        publisher: 'Scribner',
        edition: '1st Edition',
        page_count: 180,
        average_rating: 4.5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'To Kill a Mockingbird',
        isbn: '978-0-06-112008-4',
        catalog_id: 'XYZ456',
        publish_date: new Date('1960-07-11'),
        total_copies: 8,
        available_copies: 8,
        category_id: 2, // Replace with an existing category_id
        author_id: 2,   // Replace with an existing author_id
        language: 'English',
        genre: 'Fiction',
        summary: 'A novel by Harper Lee...',
        cover_image_url: 'https://example.com/to-kill-mockingbird.jpg',
        publisher: 'J.B. Lippincott & Co.',
        edition: '1st Edition',
        page_count: 281,
        average_rating: 4.8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Add 3 more books with similar structure
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(DataBaseTableNames.BOOK, null, {});
  },
};
