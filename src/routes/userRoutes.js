const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/users/count:
 *   get:
 *     summary: Lấy tổng số người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Tổng số người dùng được trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/count", UserController.countUsers);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   fullname:
 *                     type: string
 *                     example: "Nguyễn Văn A"
 *                   email:
 *                     type: string
 *                     example: "a@gmail.com"
 *                   phone:
 *                     type: string
 *                     example: "0988888888"
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/all", UserController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}/online:
 *   get:
 *     summary: Kiểm tra người dùng có đang online hay không
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Trạng thái online của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 online:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: ID không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/:id/online", UserController.checkUserOnline);

module.exports = router;
