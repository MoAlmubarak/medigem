// server/index.js
const express = require('express');
const cors = require('cors');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const { port } = config;

// Configure CORS with environment variables
app.use(cors({
  origin: config.cors.origin,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Routes
app.use('/api', require('./routes/api'));

// Health check endpoint
app.get('/', (req, res) => {
  res.send(`MediGem API is running in ${config.nodeEnv} mode`);
});

// Error handling middleware (must be after all routes)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port} in ${config.nodeEnv} mode`);
});