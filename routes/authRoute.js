const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user')

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Store user details in session
        req.session.user = {
            _id: user._id,
            email: user.email
        };

        res.redirect('/home')
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render('signup', { info: '', error: "User Already Exits" })
        }
        // Hash the password
        if (!password) {
            return res.render('signup', { info: '', error: "Password is required" })
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.render('signup', { info: "User has been registered", error: '' })
    } catch (err) {
        console.error('Error during signup', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;