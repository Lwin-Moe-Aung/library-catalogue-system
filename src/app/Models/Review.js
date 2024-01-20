'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models[DataBaseModelNames.BOOK], {
                foreignKey: {
                    name: 'bookId',
                    allowNull: false,
                },
                as: 'books',
            });
            Review.belongsTo(models[DataBaseModelNames.STUDENT], {
                foreignKey: {
                    name: 'studentId',
                    allowNull: false,
                },
                as: 'students',
            });
        }
    }
    Review.init(
        {
            bookId: DataTypes.INTEGER,
            studentId: DataTypes.INTEGER,
            rating: DataTypes.INTEGER,
            reviewText: DataTypes.TEXT,
            reviewData: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: DataBaseModelNames.REVIEW,
            underscored: true,
            paranoid: true,
        },
    );
    return Review;
};
