const express = require('express');
const authenticateJWT = require('../middleware/auth'); // Authentication middleware
const UserPlant = require('../models/UserPlant'); // Adjust path if necessary
const Plant = require('../models/Plant');
const router = express.Router();

// Get all plants in a user's garden (Protected route)
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const userPlants = await UserPlant.findAll({
            where: { user_id: req.user.id }, // Fetch plants for the logged-in user
            include: Plant, // Include plant details
        });
        res.json(userPlants);
    } catch (error) {
        console.error('Error retrieving user plants:', error); // Log the error
        res.status(500).json({ error: 'Failed to retrieve user plants' });
    }
});

// Get a specific plant in the user's garden (Protected route)
router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const userPlant = await UserPlant.findOne({
            where: { id: req.params.id, user_id: req.user.id },
            include: Plant,
        });

        if (!userPlant) {
            return res.status(404).json({ error: 'Plant not found in your garden' });
        }

        res.json(userPlant);
    } catch (error) {
        console.error('Error retrieving plant:', error);
        res.status(500).json({ error: 'Failed to retrieve plant' });
    }
});

// Add a plant to the user's garden (Protected route)
router.post('/', authenticateJWT, async (req, res) => {
    const { plant_id } = req.body;
    try {
        // Simply create a new UserPlant entry each time the user adds a plant
        const userPlant = await UserPlant.create({ user_id: req.user.id, plant_id });
        res.status(201).json(userPlant);
    } catch (error) {
        console.error('Error adding plant to garden:', error);
        res.status(500).json({ error: 'Failed to add plant to user garden' });
    }
});

// Remove a plant from the user's garden (Protected route)
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        // Find the userPlant by its unique id (userPlant.id)
        const userPlant = await UserPlant.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });

        // If no userPlant is found, return a 404 error
        if (!userPlant) {
            return res.status(404).json({ error: 'Plant not found in your garden' });
        }

        // Delete the userPlant entry from the database
        await userPlant.destroy();
        res.json({ message: 'Plant removed from your garden' });
    } catch (error) {
        console.error('Error removing plant:', error);
        res.status(500).json({ error: 'Failed to remove plant from user garden' });
    }
});

// Update watering information for a user plant (Protected route)
router.put('/:id/watering', authenticateJWT, async (req, res) => {
    const { last_watered_date, watering_frequency } = req.body;
    try {
        const userPlant = await UserPlant.findOne({
            where: { id: req.params.id, user_id: req.user.id },
        });

        if (!userPlant) {
            return res.status(404).json({ error: 'Plant not found in your garden' });
        }

        // Update the fields based on what is provided in the request body
        if (last_watered_date !== undefined) {
            userPlant.last_watered_date = last_watered_date;
        }
        if (watering_frequency !== undefined) {
            userPlant.watering_frequency = watering_frequency;
        }

        await userPlant.save();
        res.json(userPlant);
    } catch (error) {
        console.error('Error updating watering information:', error);
        res.status(500).json({ error: 'Failed to update watering information' });
    }
});

// Get days till next watering for a user plant (Protected route)
router.get('/:id/days-till-watering', authenticateJWT, async (req, res) => {
    try {
        const userPlant = await UserPlant.findOne({
            where: { id: req.params.id, user_id: req.user.id },
        });

        if (!userPlant) {
            return res.status(404).json({ error: 'Plant not found in your garden' });
        }

        const { last_watered_date, watering_frequency } = userPlant;
        const now = new Date();
        const lastWatered = new Date(last_watered_date);
        const daysSinceLastWatered = Math.floor((now - lastWatered) / (1000 * 60 * 60 * 24));
        const daysTillNextWatering = watering_frequency - daysSinceLastWatered;

        res.json({ daysTillNextWatering: Math.max(daysTillNextWatering, 0) });
    } catch (error) {
        console.error('Error calculating days till watering:', error);
        res.status(500).json({ error: 'Failed to calculate days till watering' });
    }
});

// Confirm watering for a user plant (Protected route)
router.put('/:id/confirm-watering', authenticateJWT, async (req, res) => {
    try {
        const userPlant = await UserPlant.findOne({
            where: { id: req.params.id, user_id: req.user.id },
        });

        if (!userPlant) {
            return res.status(404).json({ error: 'Plant not found in your garden' });
        }

        // Update the last watered date to today
        userPlant.last_watered_date = new Date();

        // Optionally increment the watering streak if needed
        userPlant.streak_count = (userPlant.streak_count || 0) + 1;

        await userPlant.save();
        res.json({ message: 'Watering confirmed', userPlant });
    } catch (error) {
        console.error('Error confirming watering:', error);
        res.status(500).json({ error: 'Failed to confirm watering' });
    }
});

module.exports = router;
