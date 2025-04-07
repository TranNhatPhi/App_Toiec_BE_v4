const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Truy cập bị từ chối. Token không hợp lệ!" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        console.log("✅ Token hợp lệ:", req.user);

        next();
    } catch (error) {
        console.error("❌ JWT Error:", error.message);
        return res.status(401).json({ error: "Truy cập bị từ chối. Token không hợp lệ!" });
    }
};

module.exports = verifyToken;
