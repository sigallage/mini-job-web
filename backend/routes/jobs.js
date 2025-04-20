const express = require('express');
const router = express.Router();
const pool = require('../models/db'); // Database connection

// Test route to check if routing works
router.get('/test', (req, res) => {
  res.send('Jobs route working!');
});

// POST /api/jobs - Add a new job
router.post('/', async (req, res) => {
  try {
    const { title, company, location, type, description, contact_email } = req.body;

    console.log('POST /api/jobs hit');
    console.log('Received data:', req.body);

    await pool.query(
      `INSERT INTO jobs (title, company, location, type, description, contact_email, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [title, company, location, type, description, contact_email]
    );

    res.status(201).json({ message: 'Job created and saved to DB' });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ message: 'Server error while saving job' });
  }
});

// GET /api/jobs - With pagination & optional filters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 5, location, type } = req.query;
    const offset = (page - 1) * limit;

    let baseQuery = 'SELECT * FROM jobs';
    let conditions = [];
    let values = [];

    if (location) {
      values.push(location);
      conditions.push(`location = $${values.length}`);
    }

    if (type) {
      values.push(type);
      conditions.push(`type = $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    values.push(limit, offset);
    baseQuery += ` ORDER BY id DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await pool.query(baseQuery, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('DB fetch error:', err.message);
    res.status(500).json({ message: 'Server error while fetching jobs' });
  }
});

// PUT /api/jobs/:id - Update a job
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, company, location, type, description } = req.body;

  try {
    await pool.query(
      `UPDATE jobs 
       SET title = $1, company = $2, location = $3, type = $4, description = $5 
       WHERE id = $6`,
      [title, company, location, type, description, id]
    );
    res.status(200).json({ message: 'Job updated successfully' });
  } catch (err) {
    console.error('DB update error:', err.message);
    res.status(500).json({ message: 'Server error while updating job' });
  }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM jobs WHERE id = $1', [id]);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('DB delete error:', err.message);
    res.status(500).json({ message: 'Server error while deleting job' });
  }
});

module.exports = router;
