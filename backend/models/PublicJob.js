const db = require('../models/db'); 

// You can use a query builder (e.g. knex) or raw SQL like this:
const createPublicJobTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS public_jobs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      company TEXT,
      contact_email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

createPublicJobTable();

module.exports = {
  create: async ({ title, description, company, contact_email }) => {
    const result = await db.query(
      'INSERT INTO public_jobs (title, description, company, contact_email) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, company, contact_email]
    );
    return result.rows[0];
  }
};
