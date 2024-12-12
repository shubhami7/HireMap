const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

// Signup Route
router.post('/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "User already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.status(201).json({ message: "User created successfully." });
    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Login Route
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: "User not found." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password." });

        // Since JWT usage was discussed, you may want to add JWT here
        // For now, if you don't need JWT, just return a success message
        res.status(200).json({ message: "Login successful." });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
