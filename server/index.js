const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;  // Changed default port to 3001

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/api'));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('MediGem API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});