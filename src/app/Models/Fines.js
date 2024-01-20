'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');

module.exports = (sequelize, DataTypes) => {
    class Fines extends Model {
        static associate(models) {
            Fines.belongsTo(models[DataBaseModelNames.STUDENT], {
                foreignKey: {
                    name: 'studentId',
                    allowNull: false,
                },
                as: 'students',
            });
            Fines.belongsTo(models[DataBaseModelNames.ADMIN], {
                foreignKey: {
                    name: 'adminId',
                    allowNull: false,
                },
                as: 'admins',
            });
        }
    }
    Fines.init(
        {
            studentId: DataTypes.INTEGER,
            adminId: DataTypes.INTEGER,
            amount: DataTypes.DECIMAL,
            reason: DataTypes.TEXT,
            fineDate: DataTypes.DATE,
            paid: DataTypes.BOOLEAN,

        },
        {
            sequelize,
            modelName: DataBaseModelNames.FINES,
            underscored: true,
            paranoid: true,
        },
    );
    return Fines;
};
