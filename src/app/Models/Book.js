'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models) {
            Book.belongsTo(models[DataBaseModelNames.CATEGORY], {
                foreignKey: {
                    name: 'categoryId',
                    allowNull: false,
                },
                as: 'categories',
            });

            Book.belongsTo(models[DataBaseModelNames.AUTHOR], {
                foreignKey: {
                    name: 'authorId',
                    allowNull: false,
                },
                as: 'authors',
            });

            Book.hasMany(models[DataBaseModelNames.BORROW_RECORD], {
                foreignKey: {
                name: 'bookId',
                },
                as: 'borrow_records',
            });

            Book.hasMany(models[DataBaseModelNames.RESERVATION], {
                foreignKey: {
                name: 'bookId',
                },
                as: 'reservations',
            });
            Book.hasMany(models[DataBaseModelNames.REVIEW], {
                foreignKey: {
                    name: 'bookId',
                },
                as: 'reviews',
            });
        }
    }
    Book.init(
        {
            title: DataTypes.STRING,
            isbn: DataTypes.STRING,
            publishDate: DataTypes.DATE,
            totalCopies: DataTypes.INTEGER,
            availableCopies: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
            authorId: DataTypes.INTEGER,
            language: DataTypes.STRING,
            genre: DataTypes.STRING,
            summary: DataTypes.TEXT,
            coverImageUrl: DataTypes.STRING,
            publisher: DataTypes.STRING,
            edition: DataTypes.STRING,
            pageCount: DataTypes.INTEGER,
            averageRating: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: DataBaseModelNames.BOOK,
            underscored: true,
            paranoid: true,
        },
    );
    return Book;
};
