// Import necessary modules
const express = require('express');
const sequelize = require('./config/database');
const analyticsRoutes = require('./routes/analytics'); // Import analytics routes

// Sync the database
sequelize.sync()
    .then(() => console.log("Database is open."))
    .catch((err) => console.log("Could not open database: " + `${err.message}`));

// Create an express app
const app = express();

// Middleware for handling JSON requests
app.use(express.json());

// Import Schemas
const { User, Application, Tip, Interview, Reminder } = require('./models/user');

// Routes
// Post to the users table
app.post("/users", (req, res) => {
    User.create(req.body)
        .then(() => res.send("User entry added"))
        .catch((err) => res.status(500).send(`Error: ${err.message}`));
});

// Post to the applications table
app.post("/applications", (req, res) => {
    Application.create(req.body)
        .then(() => res.send("Application entry added"))
        .catch((err) => res.status(500).send(`Error: ${err.message}`));
});

// Post to the tips table
app.post("/tips", (req, res) => {
    Tip.create(req.body)
        .then(() => res.send("Tip entry added"))
        .catch((err) => res.status(500).send(`Error: ${err.message}`));
});

// Post to the reminders table
app.post("/reminders", (req, res) => {
    Reminder.create(req.body)
        .then(() => res.send("Reminder entry added"))
        .catch((err) => res.status(500).send(`Error: ${err.message}`));
});

// Post to the interviews table
app.post("/interviews", (req, res) => {
    Interview.create(req.body)
        .then(() => res.send("Interview entry added"))
        .catch((err) => res.status(500).send(`Error: ${err.message}`));
});

// Use analytics routes
app.use('/analytics', analyticsRoutes);

// Start the server
app.listen(3021, () => {
    console.log("The server has started!");
});
app.get('/', (req, res) => {
    res.send("Welcome to the API. Use /analytics for analytics endpoints.");
});
