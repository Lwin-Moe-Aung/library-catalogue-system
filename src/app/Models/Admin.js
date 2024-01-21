'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
      static associate(models) {
        Admin.hasMany(models[DataBaseModelNames.BORROW_RECORD], {
          foreignKey: {
              name: 'adminId',
          },
          as: 'borrow_records',
        });
      }
    }
    Admin.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        refreshToken: DataTypes.STRING,
        role: DataTypes.ENUM('admin', 'sub-admin'),
      },
      {
        sequelize,
        modelName: DataBaseModelNames.ADMIN,
        underscored: true,
        paranoid: true,
      },
    );
  return Admin;
};
