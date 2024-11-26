const { Sequelize } = require('sequelize');

// Create a new sequelize object 
const sequelize = new Sequelize('db-name', 'user', 'pass', {
    dialect: 'sqlite3',
    host: './dev/sqlite' // represents a file that holds the data when application is reloaded
});

// export the object so that it can be used with express
module.exports = sequelize;