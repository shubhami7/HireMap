// Find the express.js module
const express = require('express');

// import sequelize ORM from database.js
const sequelize = require('./config/database');
sequelize.sync().then(() => console.log("Database is open."));

// Create an express app
const app = express();

// Middleware for database comms in format of json objects
app.use(express.json());

// Example attempt to create new user in table when post request sent
const { User, Application } = require('./models/user');
app.post("users", (req, res) => {
    User.create(res.body).then(() => {
        res.send("user entry added");
    });
});

app.post("applications", (req, res) => {
    Application.create(res.body).then(() => {
        res.send("application entry added");
    });
});

// Run the app on port 3021
app.listen(3021, () => {
    console.log("The server has started!");
});