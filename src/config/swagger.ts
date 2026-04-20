import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SmartCare API",
      version: "1.0.0",
      description: "Patient & Doctor API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5002",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  
  apis: [
    "./src/docs/*.ts",
    "./src/routes/*.ts",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);