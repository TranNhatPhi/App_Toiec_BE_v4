const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const baseUrl = process.env.BASE_URL || "http://localhost:5000";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TOEIC API",
            version: "1.0.0",
            description: "API cho hệ thống luyện thi TOEIC",
        },
        servers: [
            {
                // url: "http://localhost:5000",
                url: baseUrl, // Sử dụng biến môi trường BASE_URL
                description: baseUrl.includes("localhost") ? "Local server" : "Production server",
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{ BearerAuth: [] }] // 🛑 Thêm BearerAuth cho tất cả API
    },
    apis: ["./src/routes/*.js"], // Quét tất cả các file trong routes để lấy API Docs
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger Docs: http://localhost:5000/api-docs");
};

module.exports = swaggerDocs;
