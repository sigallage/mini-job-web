const pool = require('../models/db');

const getPublicJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public_jobs ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching public jobs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  
  getPublicJobs, 
};
