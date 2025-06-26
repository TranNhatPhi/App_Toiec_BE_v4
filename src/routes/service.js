// routes/service.js
const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/serviceController");
/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Lấy danh sách dịch vụ theo từng nhóm
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Lấy danh sách dịch vụ thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách dịch vụ thành công!
 *                 data:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Service'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", ServiceController.getAllGrouped);

module.exports = router;
