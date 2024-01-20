'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DataBaseTableNames } = require('../const');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DataBaseTableNames.ADMIN, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin', 'sub-admin'],
        defaultValue: 'admin',
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      last_login: {
        type: Sequelize.DATE,
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(DataBaseTableNames.ADMIN);
  }
};
