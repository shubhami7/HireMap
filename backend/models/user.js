const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// User Schema
class User extends Model {}
User.init({
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
    type: DataTypes.STRING,
  },
  // TODO: add resume, cover letter, and photo
}, {
  sequelize,
  modelName: "User",
  tableName: "users",
});

// Application Information Schema
class Application extends Model {}
Application.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
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
    values: ["interested", "applied", "interviewing", "offer"],
  },
  previousStatus: {
    type: DataTypes.ENUM,
    values: ["interested", "applied", "interviewing", "offer"],
    allowNull: true,
  },
  dateApplied: {
    type: DataTypes.DATE,
  },
  dateDeleted: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  resumePath: {
    type: DataTypes.STRING,
  },
  // TODO: Add resume, cover letter
}, {
  sequelize,
  modelName: "Application",
  tableName: "Applications",
});

// Tip Schema
class Tip extends Model {}
Tip.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  author: {
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
  },
  info: {
    type: DataTypes.STRING,
  },
  interviewStage: {
    type: DataTypes.ENUM,
    values: ["interested", "applied", "interviewing"],
  },
}, {
  sequelize,
  modelName: "Tip",
  tableName: "tips",
});

// Reminder Schema
class Reminder extends Model {}
Reminder.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: "Reminder",
  tableName: "Reminders",
});

// Interview Schema
class Interview extends Model {}
Interview.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  applicationId: {
    type: DataTypes.INTEGER, // Foreign key for the Application
  },
  date: {
    type: DataTypes.DATE,
  },
  format: {
    type: DataTypes.ENUM,
    values: ["phone", "onsite", "technical exam"],
  },
  questions: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: "Interview",
  tableName: "interviews",
});

module.exports = {
  User,
  Application,
  Tip,
  Reminder,
  Interview,
};
