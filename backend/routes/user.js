const express = require("express");
const path = require("path");
const multer = require("multer");
const { User, Application, Tip, Reminder, Interview } = require("../models/user");
const { isDeepStrictEqual } = require("util");
const router = express.Router();

// Serve uploaded files
router.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// Set up file upload middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Upload resume route
router.post("/upload-resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = `uploads/${req.file.filename}`;
  res.status(200).json({
    message: "Resume uploaded successfully",
    filePath: filePath,
  });
});

// Get resume for a specific application
router.get("/applications/:id/resume", async (req, res) => {
  const applicationId = req.params.id;
  const application = await Application.findByPk(applicationId);

  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  // Ensure that resumePath is properly set and exists
  if (!application.resumePath) {
    return res.status(404).json({ error: "No resume found for this application" });
  }

  const filePath = path.join(process.cwd(), "uploads", path.basename(application.resumePath));
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending resume file:", err);
      res.status(500).json({ error: "Failed to send resume file" });
    }
  });
});

const checkIDExist = (req, res, next) => {
  const modelMap = {
    user: User,
    application: Application,
    tip: Tip,
    reminder: Reminder,
    interview: Interview,
  };
  const model = modelMap[req.params.model];
  if (!model) return res.status(400).json({ error: "Invalid model type" });

  model
    .count({ where: { id: req.params.id } })
    .then((count) => {
      if (count > 0) {
        next();
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Creating Application
router.post("/application", (req, res) => {
  console.log("Data received by backend:", req.body);

  Application.create({
    companyName: req.body.companyName,
    userId: 1,
    position: req.body.position,
    location: req.body.location,
    contacts: req.body.contacts,
    status: req.body.status,
    previousStatus: req.body.previousStatus || null,
    dateApplied: req.body.dateApplied,
    dateDeleted: req.body.dateDeleted || null,
    deadline: req.body.deadline,
    hasStar: req.body.hasStar || null,
    resumePath: req.body.resumePath, // supports storing resume path
  })
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((err) => {
      res.status(405).json("Error has occurred: " + `${err.message}`);
    });
});

// Create Reminder
router.post("/reminder", (req, res) => {
  console.log("Data received by backend:", req.body);

  Reminder.create({
    date: req.body.date,
    description: req.body.description,
  })
    .then((reminder) => {
      res.status(200).json(reminder);
    })
    .catch((err) => {
      res.status(400).json("Error has occured: " + `${err.message}`);
    });
});

// Get All Applications
router.get("/application", (req, res) => {
  Application.findAll()
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((error) => {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Get All Reminders
router.get("/reminder", (req, res) => {
  Reminder.findAll()
    .then((reminders) => {
      res.status(200).json(reminders);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `Error retrieving reminders: ${err.message}` });
    });
});

// get application by id with model check
router.get("/application/:model/:id", [checkIDExist], async (req, res) => {
  console.log("in the backend");
  try {
    const application = await Application.findByPk(req.params.id);
    console.log("Fetched Application:", application);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
  }
});

// Update application by id (only status)
router.put("/application/:id", async (req, res) => {
  try {
    const result = await Application.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application updated successfully" });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user by id
router.delete("/user/:id", [checkIDExist], (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  }).then((result) => {
    res.status(200).json(result);
  });
});

// Delete reminder by id
router.delete("/reminder/:id", async (req, res) => {
  try {
    const reminderId = req.params.id;
    const deleted = await Reminder.destroy({ where: { id: reminderId } });
    if (deleted) {
      res.status(200).json({ message: "Reminder deleted successfully" });
    } else {
      res.status(404).json({ error: "Reminder not found" });
    }
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Soft delete an application by ID
router.put("/applications/soft-delete/:id", async (req, res) => {
  try {
    const result = await Application.update(
      { isDeleted: req.body.isDeleted, dateDeleted: req.body.dateDeleted },
      { where: { id: req.params.id } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application updated successfully" });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch deleted applications
router.get("/applications/deleted", async (req, res) => {
  console.log("Fetching deleted applications...");
  try {
    const deletedApplications = await Application.findAll({
      where: { isDeleted: true },
    });
    console.log("Fetched deleted applications:", deletedApplications);
    res.status(200).json(deletedApplications);
  } catch (error) {
    console.error("Error fetching deleted applications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Restore from trash
router.put("/applications/restore/:id", async (req, res) => {
  try {
    const result = await Application.update(
      { isDeleted: false, dateDeleted: null },
      { where: { id: req.params.id } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application restored successfully" });
  } catch (error) {
    console.error("Error restoring application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Permanently delete application by ID
router.delete("/applications/:id", async (req, res) => {
  try {
    const result = await Application.destroy({ where: { id: req.params.id } });

    if (result[0] === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application permanently deleted" });
  } catch (error) {
    console.error("Error permanently deleting application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST route for creating a new tip
router.post('/tip', async (req, res) => {
  try {
      const { author, company, info, interviewStage, userId } = req.body;

      // Create a new Tip
      const newTip = await Tip.create({
          id: userId,
          author: author,
          company: company,
          info: info,
          interviewStage: interviewStage,
      });

      // Send the created tip back as a response
      res.status(201).json(newTip);
  } catch (error) {
      console.error('Error creating tip:', error);
      res.status(500).json({ error: 'An error occurred while creating the tip.' });
  }
});

router.get('/tip', async (req, res) => {
  try {
      console.log('Fetching tips...');
      const tips = await Tip.findAll();
      console.log('Fetched tips:', tips);
      res.status(200).json(tips);
  } catch (err) {
      console.error('Error in /tip route:', err.message);
      res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});


module.exports = router;
