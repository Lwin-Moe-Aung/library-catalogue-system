'use strict';
const { Model } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.hasMany(models[DataBaseModelNames.BORROW_RECORD], {
                foreignKey: {
                    name: 'studentId',
                },
                as: 'borrow_records',
            });
            Student.hasMany(models[DataBaseModelNames.RESERVATION], {
                foreignKey: {
                    name: 'studentId',
                },
                as: 'reservations',
            });
            Student.hasMany(models[DataBaseModelNames.REVIEW], {
                foreignKey: {
                    name: 'studentId',
                },
                as: 'reviews',
            });
            Student.hasMany(models[DataBaseModelNames.FINES], {
                foreignKey: {
                    name: 'studentId',
                },
                as: 'fines',
            });
        }
    }
    Student.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            gender: DataTypes.ENUM('male', 'female', 'other'),
            dateOfBirth: DataTypes.DATE,
            email: DataTypes.STRING,
            contactNumber: DataTypes.STRING,
            address: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: DataBaseModelNames.STUDENT,
            underscored: true,
            paranoid: true,
        },
    );
    return Student;
};
