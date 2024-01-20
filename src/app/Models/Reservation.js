'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');

module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        static associate(models) {
            Reservation.belongsTo(models[DataBaseModelNames.BOOK], {
                foreignKey: {
                    name: 'bookId',
                    allowNull: false,
                },
                as: 'books',
            });
            Reservation.belongsTo(models[DataBaseModelNames.STUDENT], {
                foreignKey: {
                    name: 'studentId',
                    allowNull: false,
                },
                as: 'students',
            });
        }
    }
    Reservation.init(
        {
            bookId: DataTypes.INTEGER,
            studentId: DataTypes.INTEGER,
            reservationData: DataTypes.DATE,
            status: DataTypes.ENUM('pending', 'approved', 'canceled'),
        },
        {
            sequelize,
            modelName: DataBaseModelNames.RESERVATION,
            underscored: true,
            paranoid: true,
        },
    );
    return Reservation;
};
