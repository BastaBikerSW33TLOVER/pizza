const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route for user registration
router.post('/', async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Validate required fields
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Save the user
        const user = new User({ username, email, password, confirmPassword});
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error in registration route:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
