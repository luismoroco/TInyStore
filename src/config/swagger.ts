import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de API',
    version: '1.0.1',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  host: 'localhost:3000',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        scheme: 'auth-token',
        name: 'auth-token',
        in: 'header',
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/api/*.ts'],
};

export default swaggerJSDoc(swaggerOptions);
