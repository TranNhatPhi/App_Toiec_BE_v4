const express = require("express");
require('./models/associations');
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const swaggerDocs = require("./config/swaggerConfig");

dotenv.config();

const app = express();

// ⚙️ Middleware
app.use(cors());
app.use(express.json());

// 🟢 Kết nối database
connectDB();

// 🟢 Swagger
swaggerDocs(app);

// 🟢 Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/vehicles", require("./routes/vehicle"));  // 🟢 BỔ SUNG DÒNG NÀY
app.use("/api/services", require("./routes/service"));
app.use("/api/customers", require("./routes/customer"));
app.use("/api/customers-vehicles", require("./routes/customerVehicle"));

// 🚀 Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});
