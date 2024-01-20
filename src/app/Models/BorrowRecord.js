'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');

module.exports = (sequelize, DataTypes) => {
    class BorrowRecord extends Model {
        static associate(_models) {
            BorrowRecord.belongsTo(models[DataBaseModelNames.BOOK], {
                foreignKey: {
                    name: 'bookId',
                    allowNull: false,
                },
                as: 'books',
            });
            BorrowRecord.belongsTo(models[DataBaseModelNames.STUDENT], {
                foreignKey: {
                    name: 'studentId',
                    allowNull: false,
                },
                as: 'students',
            });
            BorrowRecord.belongsTo(models[DataBaseModelNames.ADMIN], {
                foreignKey: {
                    name: 'adminId',
                    allowNull: false,
                },
                as: 'admins',
            });
        }
    }
    BorrowRecord.init(
        {
            bookId: DataTypes.INTEGER,
            studentId: DataTypes.INTEGER,
            adminId: DataTypes.INTEGER,
            borrowDate: DataTypes.DATE,
            returnDate: DataTypes.DATE,
            status: DataTypes.ENUM('borrowed', 'returned'),
        },
        {
            sequelize,
            modelName: DataBaseModelNames.BORROW_RECORD,
            paranoid: true,
            underscored: true,
        },
    );
    return BorrowRecord;
};
