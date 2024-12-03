const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const tableName1 = 'users';
const tableName2 = 'applications';
const tableName3 = 'application information';

// User Schema
class User extends Model {}
sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.STRING
    },
    // TODO: add resume, cover letter, and photo
}, { tableName1 });

// Application Information Schema
class Application extends Model {}
sequelize.define('Application', {
    companyName: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    contacts: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['interested', 'applied', 'interviewing'],
    },
    previousStatus: {
        type: DataTypes.ENUM,
        values: ['interested', 'applied', 'interviewing'],
    },
    dateApplied: {
        type: DataTypes.DATE
    },
    dateDeleted: {
        type: DataTypes.DATE,
    },
    hasStar: {
        type: DataTypes.BOOLEAN,
    },
    // TODO: Add resume, cover letter, 
}, { tableName3 });


module.exports = {
    User,
    Application 
};