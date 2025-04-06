const User = require("../models/user");


const UserService = {
    async countUsers() {
        return await User.count({
            where: {
                role_id: 2, // ✅ Chỉ đếm những user có role là User
            },
        });
    },
};

module.exports = UserService;
