'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../const');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.BORROW_RECORD, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      borrow_date: {
        type: Sequelize.DATE,
      },
      return_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('borrowed', 'returned'),
        defaultValue: 'borrowed',
        allowNull: false,
      },
      // Add other borrow record details here
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
    await queryInterface.dropTable(DataBaseTableNames.BORROW_RECORD);
  },
};
