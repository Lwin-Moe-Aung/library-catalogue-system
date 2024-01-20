'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');

module.exports = (sequelize, DataTypes) => {
    class Author extends Model {
        static associate(models) {
            Author.hasMany(models[DataBaseModelNames.BOOK], {
                foreignKey: {
                    name: 'authorId',
                },
                as: 'books',
            });
        }
    }
    Author.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            fullName: DataTypes.STRING,
            gender: DataTypes.ENUM('male', 'female', 'other'),
            dateOfBirth: DataTypes.DATE,
            nationality: DataTypes.STRING,
            email: DataTypes.STRING,
            website: DataTypes.STRING,
            biography: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: DataBaseModelNames.AUTHOR,
            underscored: true,
            paranoid: true,
        },
    );
    return Author;
};
