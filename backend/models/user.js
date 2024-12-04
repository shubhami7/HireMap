const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Tables to create
const tableName1 = 'users';
const tableName2 = 'applications';
const tableName3 = 'application information';
const tableName4 = 'tips';
const tableName5 = 'reminders';
const tableName6 = 'interviews';
// TODO: create the rest of the tables

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
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER, //Foreign key, can determine which user this application belongs to
    },
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

class Tip extends Model {}
sequelize.define("Tip", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
    }, 
    userId: {
        type: DataTypes.INTEGER, // is this the right way to connect the tables? foreign key??
    },
    author: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.STRING,
    },
    interviewStage: {
        type: DataTypes.ENUM,
        values: ['interested', 'applied', 'interviewing'],
    },
}, { tableName4 });

class Reminder extends Model {}
sequelize.define('Reminder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
    },
    description: {
        type: DataTypes.STRING,
    },
}, { tableName5 });

class Interview extends Model {}
sequelize.define('Interview', {
    // TODO:
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    applicationId: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
    },
    format: {
        type: DataTypes.ENUM,
        values: ['phone', 'onsite', 'technical exam'],
    },
    questions: {
        type: DataTypes.STRING,
    }
}, { tableName6 });

module.exports = {
    User,
    Application,
    Tip,
    Reminder,
    Interview
};