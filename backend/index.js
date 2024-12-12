const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const sequelize = require('./config/database');
const { Application } = require('./models/user');

// Sync the database
sequelize.sync({ alter: true })
    .then(() => console.log("Database is open."))
    .catch(err => console.log("Could not open database: " + err.message));

const app = express();

// Allow requests from http://127.0.0.1:5500
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// Middleware for parsing JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user');   // Original user routes
const authRoutes = require('./routes/auth');   // Auth routes

// Use routes
app.use('/', userRoutes);
app.use('/', authRoutes);

// Cron job to delete applications older than 30 days
cron.schedule('0 0 * * *', async () => {  
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Find applications flagged as deleted and older than 30 days
        await Application.destroy({
            where: {
                isDeleted: true,
                dateDeleted: {
                    [sequelize.Sequelize.Op.lt]: thirtyDaysAgo
                }
            }
        });

        console.log('Old deleted applications permanently removed from the database.');
    } catch (err) {
        console.error('Error deleting old applications:', err.message);
    }
});

// Example route to post to applications table
app.post("/application", (req, res) => {
    Application.create(req.body)
        .then(() => res.send("Application entry added"))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Start server
app.listen(3021, () => {
    console.log("The server has started on port 3021!");
});
