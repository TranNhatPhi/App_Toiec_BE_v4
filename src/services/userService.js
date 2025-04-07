const User = require("../models/user");

// ⚠️ Tạm thời lưu online users trong bộ nhớ (có thể thay bằng Redis trong môi trường production)
const onlineUsers = new Set();

const UserService = {
    // ✅ Đếm số lượng user có role là 2 (người dùng thường)
    async countUsers() {
        return await User.count({
            where: { role_id: 2 },
        });
    },

    // ✅ Lấy danh sách tất cả người dùng role_id = 2
    async getAllUsers() {
        const users = await User.findAll({
            where: { role_id: 2 },
            attributes: ["id", "fullname", "email", "phone", "date_of_birth", "role_id"],
            order: [["id", "DESC"]],
        });

        // Gắn thêm trạng thái online từ onlineUsers Set
        const usersWithStatus = users.map(user => ({
            ...user.toJSON(),
            online: onlineUsers.has(user.id)
        }));

        return usersWithStatus;
    },

    // ✅ Kiểm tra trạng thái online của 1 user
    isUserOnline(userId) {
        return onlineUsers.has(userId);
    },

    // ✅ Đánh dấu user online
    setUserOnline(userId) {
        onlineUsers.add(userId);
    },

    // ✅ Đánh dấu user offline
    setUserOffline(userId) {
        onlineUsers.delete(userId);
    },

    // ✅ Lấy danh sách userId đang online (cho frontend realtime)
    getOnlineUserIds() {
        return Array.from(onlineUsers);
    }
};

module.exports = UserService;