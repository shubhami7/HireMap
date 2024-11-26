// Find the express.js module
const express = require('express');

// import sequelize ORM from database.js
const sequelize = require('./config/database');
sequelize.sync().then(() => console.log("Database is open."));

// Create an express app
const app = express();

// Run the app on port 3021
app.listen(3021, () => {
    console.log("The server has started!");
});