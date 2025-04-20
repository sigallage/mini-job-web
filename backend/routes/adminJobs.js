// routes/jobs.js
const express = require('express');
const router = express.Router();
const db = require('../models/db'); 

router.post('/', async (req, res) => {
  const { title, company, location, type, description, contact_email } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO jobs (title, company, location, type, description, contact_email, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [title, company, location, type, description, contact_email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting job:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
