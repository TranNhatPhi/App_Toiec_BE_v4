const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const baseUrl = process.env.BASE_URL || "http://localhost:5000";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRM Wash API",
            version: "1.0.0",
            description: "🚗 Hệ thống API quản lý tiệm rửa xe: POS, doanh thu, nhân viên, lịch đặt lịch, thống kê, báo cáo, và nhiều hơn nữa.",
            contact: {
                name: "CRM Wash Dev Team",
                email: "support@crmwash.com"
            },
        },
        servers: [
            {
                url: baseUrl,
                description: baseUrl.includes("localhost") ? "🔧 Local Server" : "🚀 Production Server"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ BearerAuth: [] }], // ⚠️ Bảo vệ tất cả endpoint bằng JWT nếu không override
    },
    apis: ["./src/routes/*.js"], // Đường dẫn đến file Swagger comment
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger Docs: ${baseUrl}/api-docs`);
};

module.exports = swaggerDocs;
