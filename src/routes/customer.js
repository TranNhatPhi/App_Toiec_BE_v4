const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customerController");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Quản lý khách hàng
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Lấy danh sách khách hàng
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lấy thành công danh sách khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 */
router.get("/", CustomerController.getAll);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Lấy thông tin 1 khách hàng
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thành công khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */
router.get("/:id", CustomerController.getById);

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerInput:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           example: Nguyen Van A
 *         email:
 *           type: string
 *           example: a@example.com
 *         phone:
 *           type: string
 *           example: "0987654321"
 *         joined_at:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T10:00:00Z"
 *         tags:
 *           type: string
 *           example: VIP,Regular
 *         membership_id:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Tạo mới khách hàng
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       201:
 *         description: Tạo khách hàng thành công
 */
router.post("/", CustomerController.create);


/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Cập nhật khách hàng
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", CustomerController.update);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Xoá khách hàng
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Xoá thành công
 */
router.delete("/:id", CustomerController.delete);

module.exports = router;
