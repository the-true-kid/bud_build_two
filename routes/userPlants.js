const express = require('express');
const authenticateJWT = require('../middleware/auth'); // Authentication middleware
const pool = require('../db'); // Database connection pool
const router = express.Router();

// Get all plants in a user's garden (Protected route)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT up.id AS user_plant_id, p.* 
      FROM UserPlant up
      JOIN Plant p ON up.plant_id = p.id
      WHERE up.user_id = $1
      `,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving user plants:', error);
    res.status(500).json({ error: 'Failed to retrieve user plants' });
  }
});

// Get a specific plant in the user's garden (Protected route)
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT up.id AS user_plant_id, p.* 
      FROM UserPlant up
      JOIN Plant p ON up.plant_id = p.id
      WHERE up.id = $1 AND up.user_id = $2
      `,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plant not found in your garden' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving plant:', error);
    res.status(500).json({ error: 'Failed to retrieve plant' });
  }
});

// Add a plant to the user's garden (Protected route)
router.post('/', authenticateJWT, async (req, res) => {
  const { plant_id } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO UserPlant (user_id, plant_id, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *
      `,
      [req.user.id, plant_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding plant to garden:', error);
    res.status(500).json({ error: 'Failed to add plant to user garden' });
  }
});

// Remove a plant from the user's garden (Protected route)
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM UserPlant
      WHERE id = $1 AND user_id = $2
      RETURNING *
      `,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plant not found in your garden' });
    }

    res.json({ message: 'Plant removed from your garden', removedPlant: result.rows[0] });
  } catch (error) {
    console.error('Error removing plant:', error);
    res.status(500).json({ error: 'Failed to remove plant from user garden' });
  }
});

module.exports = router;
