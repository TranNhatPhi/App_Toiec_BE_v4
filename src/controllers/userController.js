const UserService = require("../services/userService");

const UserController = {
    // ✅ Đếm số user
    async countUsers(req, res) {
        try {
            const totalUsers = await UserService.countUsers();
            res.status(200).json({ total: totalUsers });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi đếm số người dùng", error });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers(); // ← đã sửa service nên gọi đúng rồi
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error });
        }
    },

    // ✅ Kiểm tra user online (tạm thời)
    async checkUserOnline(req, res) {
        try {
            const userId = Number(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ message: "ID không hợp lệ" });
            }

            const online = UserService.isUserOnline(userId);
            res.status(200).json({ online });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi kiểm tra trạng thái online", error });
        }
    }
};

module.exports = UserController;
