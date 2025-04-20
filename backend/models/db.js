const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jobboard', 
  password: 'dreamhigh', 
  port: 5432,
});

module.exports = pool;
