// server/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./index');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MediGem API Documentation',
    version: '1.0.0',
    description: 'API documentation for MediGem - OTC Medication Side Effects Chatbot',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'MediGem Support',
      url: 'https://medigem.example.com',
      email: 'support@medigem.example.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`,
      description: 'Development server',
    },
    {
      url: 'https://api.medigem.example.com/api',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Medications',
      description: 'API endpoints for medication information',
    },
    {
      name: 'Health',
      description: 'API health check endpoints',
    },
  ],
  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'fail',
          },
          message: {
            type: 'string',
            example: 'Invalid input data',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  example: 'drugName',
                },
                message: {
                  type: 'string',
                  example: 'Drug name is required',
                },
              },
            },
          },
        },
      },
      DrugInfo: {
        type: 'object',
        properties: {
          brandName: {
            type: 'string',
            example: 'Advil',
          },
          genericName: {
            type: 'string',
            example: 'Ibuprofen',
          },
          lastUpdated: {
            type: 'string',
            example: '20220301',
          },
        },
      },
      SideEffects: {
        type: 'object',
        properties: {
          common: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['Headache', 'Nausea', 'Dizziness'],
          },
          serious: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['Allergic reaction', 'Difficulty breathing', 'Chest pain'],
          },
          interactions: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['May interact with blood thinners', 'Do not take with alcohol'],
          },
        },
      },
      Guidance: {
        type: 'object',
        properties: {
          whenToConsult: {
            type: 'string',
            example: 'Consult a doctor if symptoms persist for more than 7 days.',
          },
        },
      },
      MedicationResponse: {
        type: 'object',
        properties: {
          drugInfo: {
            $ref: '#/components/schemas/DrugInfo',
          },
          sideEffects: {
            $ref: '#/components/schemas/SideEffects',
          },
          guidance: {
            $ref: '#/components/schemas/Guidance',
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Bad Request - Invalid input parameters',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      NotFound: {
        description: 'Not Found - The requested resource was not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      ServerError: {
        description: 'Server Error - Something went wrong on the server',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
    parameters: {
      drugNameParam: {
        in: 'path',
        name: 'drugName',
        required: true,
        schema: {
          type: 'string',
          example: 'Ibuprofen',
        },
        description: 'Name of the medication to lookup',
      },
      limitParam: {
        in: 'query',
        name: 'limit',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          maximum: 10,
          default: 1,
        },
        description: 'Number of results to return (1-10)',
      },
      includeInteractionsParam: {
        in: 'query',
        name: 'includeInteractions',
        required: false,
        schema: {
          type: 'boolean',
          default: false,
        },
        description: 'Whether to include drug interactions in the response',
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js', './controllers/*.js', './docs/**/*.yaml'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;