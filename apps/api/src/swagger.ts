import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger options
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Backend API",
            description: "API documentation for the backend",
            version: "1.0.0",
        },
        servers: [
            {
                url: process.env.DEVELOPMENT === "production" ? `http://194.5.207.248:${process.env.PORT}/` : `http://localhost:${process.env.PORT}/`,
                // description: "Local development server",
            },
        ],
    },
    apis: ["./src/docs/*.ts"], // Point to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log('\x1b[36mSwagger docs available at \x1b[33mhttp://localhost:' +
        `\x1b[32m${process.env.PORT}\x1b[0m\x1b[33m/api-docs\x1b[0m 📄`);
}
