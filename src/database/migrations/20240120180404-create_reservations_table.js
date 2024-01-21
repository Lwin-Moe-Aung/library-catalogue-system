'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../const');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.RESERVATION, {
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
      reservation_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'canceled'),
        defaultValue: 'pending',
        allowNull: false,
      },
      // Add other reservation details here
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
    await queryInterface.dropTable(DataBaseTableNames.RESERVATION);
  },
};
