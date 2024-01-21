'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../const');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.BOOK, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      publish_date: {
        type: Sequelize.DATE,
      },
      total_copies: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      available_copies: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING(50),
      },
      genre: {
        type: Sequelize.STRING(50),
      },
      summary: {
        type: Sequelize.TEXT,
      },
      cover_image_url: {
        type: Sequelize.STRING(255),
      },
      publisher: {
        type: Sequelize.STRING(100),
      },
      edition: {
        type: Sequelize.STRING(50),
      },
      page_count: {
        type: Sequelize.INTEGER,
      },
      average_rating: {
        type: Sequelize.DECIMAL(3, 2),
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataBaseTableNames.BOOK);
  },
};
