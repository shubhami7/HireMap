const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// User Schema
class User extends Model {}
User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

// Application Schema
class Application extends Model {}
Application.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.ENUM('interested', 'applied', 'interviewing', 'offer'),
        allowNull: false,
    },
    previousStatus: {
        type: DataTypes.ENUM('interested', 'applied', 'interviewing', 'offer'),
    },
    dateApplied: {
        type: DataTypes.DATE,
    },
    dateDeleted: {
        type: DataTypes.DATE,
    },
    hasStar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'Application',
    tableName: 'applications',
});

// Tip Schema
class Tip extends Model {}
Tip.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    author: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.STRING,
    },
    interviewStage: {
        type: DataTypes.ENUM('interested', 'applied', 'interviewing'),
    },
}, {
    sequelize,
    modelName: 'Tip',
    tableName: 'tips',
});

// Reminder Schema
class Reminder extends Model {}
Reminder.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Reminder',
    tableName: 'reminders',
});

// Interview Schema
class Interview extends Model {}
Interview.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    applicationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Application,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
    },
    format: {
        type: DataTypes.ENUM('phone', 'onsite', 'technical exam'),
    },
    questions: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Interview',
    tableName: 'interviews',
});

// Establish relationships between tables
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Tip, { foreignKey: 'userId' });
Tip.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Reminder, { foreignKey: 'userId' });
Reminder.belongsTo(User, { foreignKey: 'userId' });

Application.hasMany(Interview, { foreignKey: 'applicationId' });
Interview.belongsTo(Application, { foreignKey: 'applicationId' });

module.exports = {
    User,
    Application,
    Tip,
    Reminder,
    Interview,
};
