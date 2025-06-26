const jwt = require("jsonwebtoken");
const R = require("../utils/responseHelper"); // ✅ helper phản hồi

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return R.unauthorizedResponse(res, "Token không được cung cấp hoặc sai định dạng.");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ Token hợp lệ:", decoded);
        next();
    } catch (error) {
        console.error("❌ JWT Error:", error.message);

        const message = error.name === "TokenExpiredError"
            ? "Token đã hết hạn. Vui lòng đăng nhập lại."
            : "Token không hợp lệ.";

        return R.unauthorizedResponse(res, message);
    }
};

module.exports = verifyToken;
