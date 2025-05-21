// server/index.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
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

// Serve Swagger documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MediGem API Documentation',
}));

// Serve Swagger JSON
app.get('/api/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API routes
app.use('/api', require('./routes/api'));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a status message indicating the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Health check message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: MediGem API is running in development mode
 */
app.get('/', (req, res) => {
  res.send(`MediGem API is running in ${config.nodeEnv} mode`);
});

// Error handling middleware (must be after all routes)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port} in ${config.nodeEnv} mode`);
  console.log(`API Documentation available at http://localhost:${port}/api/docs`);
});