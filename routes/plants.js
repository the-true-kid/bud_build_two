const express = require('express');
const pool = require('../db'); // Import the database connection pool
const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Plant');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving plants:', error);
    res.status(500).json({ error: 'Failed to retrieve plants' });
  }
});

// Get a specific plant by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM Plant WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving the plant:', error);
    res.status(500).json({ error: 'Failed to retrieve the plant' });
  }
});

// Add a new plant
router.post('/', async (req, res) => {
  const { name, water_intervals, care_info } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Plant (name, water_intervals, care_info, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
      [name, water_intervals, care_info]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating new plant:', error);
    res.status(500).json({ error: 'Failed to create new plant' });
  }
});

module.exports = router;
