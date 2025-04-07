const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const swaggerDocs = require("./config/swaggerConfig");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app); // 👈 tạo server từ http để gắn socket
const io = socketIo(server, {
    cors: {
        origin: "*", // Bạn có thể giới hạn domain nếu muốn
        methods: ["GET", "POST"]
    }
});

// 👥 Lưu onlineUsers thành module để các file khác dùng chung
const onlineUsers = new Set();
module.exports.onlineUsers = onlineUsers; // ✅ export để dùng trong service

// 🔌 Lắng nghe kết nối từ client
io.on("connection", (socket) => {
    console.log("🟢 Client kết nối:", socket.id);

    socket.on("user-online", (userId) => {
        onlineUsers.add(userId);
        io.emit("update-online-users", Array.from(onlineUsers));
    });

    socket.on("user-offline", (userId) => {
        onlineUsers.delete(userId);
        io.emit("update-online-users", Array.from(onlineUsers));
    });

    socket.on("disconnect", () => {
        console.log("🔴 Client ngắt kết nối:", socket.id);
        // ❗Không xóa user khỏi danh sách vì không biết userId
    });
});

// ⚙️ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// 🟢 Kết nối database
connectDB();

// 🟢 Swagger Docs
swaggerDocs(app);

// 🟢 Sử dụng routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));
app.use("/api/exam-parts", require("./routes/examPartRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/exam-results", require("./routes/examResultRoutes"));

// 🚀 Khởi động server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});
