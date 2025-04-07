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
        origin: "*", // 👉 Bạn có thể thay bằng domain FE nếu cần bảo mật hơn
        methods: ["GET", "POST"]
    }
});

// 👥 Lưu user online trong bộ nhớ
const onlineUsers = new Set();
module.exports.onlineUsers = onlineUsers; // Export nếu service khác cần

// 🔌 Kết nối socket.io
io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // ✅ Khi user login hoặc reconnect
    socket.on("user-online", (userId) => {
        console.log(`✅ User ${userId} online`);
        onlineUsers.add(userId);
        socket.userId = userId; // Gắn vào socket để dùng khi disconnect
        io.emit("update-online-users", Array.from(onlineUsers));
    });

    // ✅ Khi user logout hoặc đóng tab (gửi thủ công)
    socket.on("user-offline", (userId) => {
        console.log(`❌ User ${userId} offline`);
        onlineUsers.delete(userId);
        io.emit("update-online-users", Array.from(onlineUsers));
    });

    // ✅ Khi socket disconnect (rớt mạng, reload, đóng tab)
    socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
        if (socket.userId) {
            console.log(`⚠️ Xoá user ${socket.userId} khỏi onlineUsers`);
            onlineUsers.delete(socket.userId);
            io.emit("update-online-users", Array.from(onlineUsers));
        }
    });
});

// ⚙️ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// 🟢 Kết nối database
connectDB();

// 🟢 Swagger
swaggerDocs(app);

// 🟢 Routes
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
