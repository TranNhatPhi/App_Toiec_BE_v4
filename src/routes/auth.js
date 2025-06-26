const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const R = require("../utils/responseHelper");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Quản lý xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - retype_password
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               retype_password:
 *                 type: string
 *                 example: 123456
 *               address:
 *                 type: string
 *                 example: Hà Nội, Việt Nam
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-01
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Mật khẩu không khớp
 *       409:
 *         description: Email đã tồn tại
 *       500:
 *         description: Lỗi hệ thống
 */
router.post("/register", async (req, res) => {
    const {
        fullname,
        email,
        password,
        retype_password,
        address,
        phone,
        date_of_birth,
    } = req.body;

    if (password !== retype_password) {
        return R.badRequestResponse(res, "Mật khẩu không khớp!");
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return R.conflictResponse(res, "Email đã tồn tại");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            address,
            phone,
            date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
            role_id: 2,
        });

        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, role: newUser.role_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
        );

        return R.createdResponse(res, "Đăng ký thành công", { token });
    } catch (error) {
        console.error("❌ Lỗi đăng ký:", error);
        return R.serverErrorResponse(res, "Đã xảy ra lỗi hệ thống khi đăng ký");
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng nhập thành công
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Email hoặc mật khẩu không đúng
 *       500:
 *         description: Lỗi hệ thống
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return R.unauthorizedResponse(res, "Email không tồn tại");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return R.unauthorizedResponse(res, "Mật khẩu không đúng");
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
        );

        return R.successResponse(res, "Đăng nhập thành công", { token });
    } catch (error) {
        console.error("❌ Lỗi đăng nhập:", error);
        return R.serverErrorResponse(res, "Đã xảy ra lỗi hệ thống khi đăng nhập");
    }
});

module.exports = router;
