const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const sequelize = require("./config/database");

// Sync the database
sequelize.sync({ alter: true })
  .then(() => console.log("Database is open."))
  .catch((err) => console.log("Could not open database: " + err.message));

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

// Import and use routes
const userRoutes = require("./routes/user");   // Original user routes
const authRoutes = require("./routes/auth");   // Auth routes for login/signup

app.use("/", userRoutes);
app.use("/", authRoutes);

// Import Schemas
const { User, Application, Tip, Interview, Reminder } = require("./models/user");

// Cron job to delete applications older than 30 days
cron.schedule("0 0 * * *", async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Use 'isDeleted' and 'dateDeleted' as per the updated backend logic
    await Application.destroy({
      where: {
        isDeleted: true,
        dateDeleted: {
          [sequelize.Sequelize.Op.lt]: thirtyDaysAgo,
        },
      },
    });

    console.log("Old deleted applications permanently removed from the database.");
  } catch (err) {
    console.error("Error deleting old applications:", err.message);
  }
});

// Additional POST endpoints (merged from the no sign-in code)
// Post to the users table
app.post("/users", (req, res) => {
  User.create(req.body)
    .then(() => res.send("User entry added"))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Post to the applications table
app.post("/application", (req, res) => {
  Application.create(req.body)
    .then(() => res.send("application entry added"))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Post to the tips table
app.post("/tips", (req, res) => {
  Tip.create(req.body)
    .then(() => res.send("tip entry added"))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Post to the reminders table
app.post("/reminders", (req, res) => {
  Reminder.create(req.body)
    .then(() => res.send("reminder entry added"))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Post to the interviews table
app.post("/interviews", (req, res) => {
  Interview.create(req.body)
    .then(() => res.send("interview entry added"))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.listen(3021, () => {
  console.log("The server has started on port 3021!");
});
