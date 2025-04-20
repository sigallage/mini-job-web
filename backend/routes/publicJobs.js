const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Get all public jobs
router.get('/public-jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public_jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
