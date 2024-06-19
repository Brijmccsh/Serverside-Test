const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { validateUser } = require('../middleware/validation');

// Create a new user
router.post('/', validateUser, async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Update a user
router.put('/:id', validateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await User.findByPk(id);
        if (user) {
            user.name = name;
            user.email = email;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;
