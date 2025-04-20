const pool = require('../models/db');

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new job
const createJob = async (req, res) => {
  const { title, company, location, type, description } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: 'Title and Company are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, company, location, type, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, company, location, type, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM jobs WHERE id = $1', [id]);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  deleteJob,
};
