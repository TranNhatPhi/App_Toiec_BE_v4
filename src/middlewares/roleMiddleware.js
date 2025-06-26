const R = require("../utils/responseHelper"); // ✅ helper phản hồi

const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user || typeof req.user.role === "undefined") {
                return R.forbiddenResponse(res, "Không có quyền truy cập!"); // 403
            }

            const userRole = req.user.role;

            if (!allowedRoles.includes(userRole)) {
                return R.forbiddenResponse(res, "Bạn không có quyền thực hiện hành động này!");
            }

            next(); // ✅ Role hợp lệ, cho phép tiếp tục
        } catch (error) {
            console.error("❌ Lỗi phân quyền:", error);
            return R.serverErrorResponse(res, "Lỗi phân quyền!");
        }
    };
};

module.exports = verifyRole;
