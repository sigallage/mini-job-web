const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');
const publicJobRoutes = require('./routes/publicJobs'); //Import public job routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', publicJobRoutes); //Add this line for public job API

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
