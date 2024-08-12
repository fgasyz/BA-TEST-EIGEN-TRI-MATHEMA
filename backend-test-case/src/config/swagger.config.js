// config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'BE-TEST-EIGEN-TRI-MATHEMA',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [path.join(__dirname, '../application/*.controller.js')],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
