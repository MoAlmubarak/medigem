const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Changed from 5000 to 3001

// Enable CORS for all routes
app.use(cors());

// A simple route that just returns text
app.get('/', (req, res) => {
  res.send('Hello from MediGem API');
});

app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});