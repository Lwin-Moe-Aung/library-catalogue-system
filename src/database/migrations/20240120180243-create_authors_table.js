'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../const');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.AUTHOR, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(255),
      },
      full_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        defaultValue: 'male',
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATE,
      },
      nationality: {
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      website: {
        type: Sequelize.STRING(255),
      },
      biography: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DataBaseTableNames.AUTHOR);
  },
};
