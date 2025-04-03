//server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const swaggerDocs = require("./config/swaggerConfig");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads")); // 🆕 Cho phép truy cập ảnh đã upload

// 🟢 Kết nối database
connectDB();

// 🟢 Đồng bộ database
// sequelize.sync({ alter: false }) // alter: true để tự động cập nhật cấu trúc bảng nếu có thay đổi
//     .then(() => console.log("✅ Database đã được đồng bộ!"))
//     .catch(err => console.error("❌ Lỗi đồng bộ database:", err));

// 🟢 Import routes
const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/examRoutes");
const examPartRoutes = require("./routes/examPartRoutes");
const questionRoutes = require("./routes/questionRoutes");
const examResultRoutes = require("./routes/examResultRoutes");  // 🆕 Thêm route Exam Results

// 🟢 Kích hoạt Swagger Docs
swaggerDocs(app);
app.use("/api/users", require("./routes/userRoutes"));

// 🟢 Sử dụng routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exam-parts", examPartRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exam-results", examResultRoutes);   // 🆕 API Kết quả bài thi

// 🟢 Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});
