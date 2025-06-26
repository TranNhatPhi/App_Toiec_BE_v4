require("dotenv").config(); // Đảm bảo dotenv được gọi đầu tiên
require('./associations');   // Load toàn bộ các quan hệ

const { sequelize } = require("../config/db");
const Role = require("./role");
const User = require("./user");
const Customer = require("./customer");
const Vehicle = require("./vehicle");
const Booking = require("./booking");
const BookingService = require("./booking_service");
const Service = require("./service");
const Transaction = require("./transaction");
const Membership = require("./membership");
const Message = require("./message");

const bcrypt = require("bcryptjs");

const initDatabase = async () => {
    try {
        // 🟢 Đồng bộ toàn bộ database (không xóa dữ liệu cũ)
        await sequelize.sync({ alter: true });
        console.log("✅ Database đã được đồng bộ!");

        // 🟢 Thêm các role mặc định
        const roles = ["Admin", "User", "Moderator"];
        for (let i = 0; i < roles.length; i++) {
            await Role.findOrCreate({
                where: { id: i + 1 },
                defaults: { name: roles[i] },
            });
        }
        console.log("✅ Dữ liệu roles đã được thêm!");

        // 🟢 Tạo user mẫu nếu chưa có
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const [user, created] = await User.findOrCreate({
            where: { email: "admin@example.com" },
            defaults: {
                fullname: "Super Admin",
                email: "admin@example.com",
                password: hashedPassword,
                role_id: 1, // Admin
            },
        });

        if (created) {
            console.log("✅ User mẫu đã được tạo!");
        } else {
            console.log("ℹ️ User mẫu đã tồn tại.");
        }

        console.log("🎉 Database sẵn sàng!");
        process.exit(0); // Kết thúc tiến trình Node sau khi sync xong
    } catch (error) {
        console.error("❌ Lỗi khi khởi tạo database:", error);
        process.exit(1);
    }
};

initDatabase();
