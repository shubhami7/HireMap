const { Sequelize } = require('@sequelize/core');
const { SqliteDialect } = require('@sequelize/sqlite3');

// Create a new sequelize object 
const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: './dev/sqlite' // represents a file that holds the data when application is reloaded
    // models: [] // TODO: ADD MODELS
});

// export the object so that it can be used with express
module.exports = sequelize;