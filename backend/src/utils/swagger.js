const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Forja de Heróis API',
      version: '1.0.0',
      description: 'API para gerenciamento de missões, XP e evolução de heróis.'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            xp: { type: 'integer' },
            level: { type: 'integer' }
          }
        },
        Mission: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            difficulty: { type: 'string' },
            xp: { type: 'integer' },
            status: { type: 'string' },
            userId: { type: 'string' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
