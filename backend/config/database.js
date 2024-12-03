const { Sequelize } = require('@sequelize/core');
const { SqliteDialect } = require('@sequelize/sqlite3');
//const { User } = require('../models/user');

// Create a new sequelize object 
const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: './db/sqlite', // represents a file that holds the data when application is reloaded
    //models: [User] // TODO: ADD MODELS to initialize, import from models file at top
});

// export the object so that it can be used with express
module.exports = sequelize;