const express = require('express');
const Plant = require('../models/Plant');  // Adjust path if necessary
const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.findAll();  // Fetch all plants from the database
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve plants' });
  }
});

// Get a specific plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findByPk(req.params.id);  // Fetch plant by ID
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the plant' });
  }
});

// (Optional) Add a new plant
router.post('/', async (req, res) => {
  const { name, water_intervals, care_info } = req.body;
  try {
    const newPlant = await Plant.create({ name, water_intervals, care_info });
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create new plant' });
  }
});

module.exports = router;
