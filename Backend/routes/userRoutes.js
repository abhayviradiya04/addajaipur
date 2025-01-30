const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Create a new user
router.post('/addUser', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user.', error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error: error.message });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user.', error: error.message });
    }
});

// Update a user by ID
router.patch('/updateUser/:id', async (req, res) => {
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user.', error: error.message });
    }
});

// Delete a user by ID
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully!', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user.', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        
        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Check password
        if (user.password !== password) { // Note: In production, use proper password hashing
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Create user data to send (excluding sensitive information)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            wishlistItems: user.wishlistItems,
            cartItems: user.cartItems,
            orders: user.orders
        };

        res.status(200).json({
            message: 'Login successful!',
            user: userData
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login.', error: error.message });
    }
});
module.exports = router; 