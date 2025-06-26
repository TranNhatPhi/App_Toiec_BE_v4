const express = require("express");
const router = express.Router();
const CustomerVehicleController = require("../controllers/customerVehicleController");

/**
 * @swagger
 * tags:
 *   name: Customers & Vehicles
 *   description: Quản lý khách hàng và phương tiện (Customer & Vehicle Management)
 */

/**
 * @swagger
 * /api/customers-vehicles:
 *   post:
 *     summary: Tạo mới khách hàng và phương tiện
 *     tags: [Customers & Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicle
 *               - customer
 *             properties:
 *               vehicle:
 *                 type: object
 *                 required:
 *                   - license_plate
 *                   - model
 *                   - color
 *                 properties:
 *                   license_plate:
 *                     type: string
 *                     example: "30F-12345"
 *                   model:
 *                     type: string
 *                     example: "Toyota Camry"
 *                   color:
 *                     type: string
 *                     example: "White"
 *                   notes:
 *                     type: string
 *                     example: "New vehicle"
 *               customer:
 *                 type: object
 *                 required:
 *                   - name
 *                   - phone
 *                   - email
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Nguyen Van A"
 *                   phone:
 *                     type: string
 *                     example: "0987654321"
 *                   email:
 *                     type: string
 *                     example: "nguyenvana@example.com"
 *                   address:
 *                     type: string
 *                     example: "123 Street, Hanoi"
 *                   customer_notes:
 *                     type: string
 *                     example: "VIP customer"
 *     responses:
 *       201:
 *         description: Tạo khách hàng và phương tiện thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Tạo khách hàng và phương tiện thành công!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     customer:
 *                       $ref: '#/components/schemas/Customer'
 *                     vehicle:
 *                       $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", CustomerVehicleController.create);

/**
 * @swagger
 * /api/customers-vehicles/{id}:
 *   put:
 *     summary: Cập nhật khách hàng và phương tiện
 *     tags: [Customers & Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của khách hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicle
 *               - customer
 *             properties:
 *               vehicle:
 *                 type: object
 *                 required:
 *                   - license_plate
 *                   - model
 *                   - color
 *                 properties:
 *                   license_plate:
 *                     type: string
 *                     example: "30F-12345"
 *                   model:
 *                     type: string
 *                     example: "Toyota Camry"
 *                   color:
 *                     type: string
 *                     example: "White"
 *                   notes:
 *                     type: string
 *                     example: "Updated vehicle"
 *               customer:
 *                 type: object
 *                 required:
 *                   - name
 *                   - phone
 *                   - email
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Nguyen Van A"
 *                   phone:
 *                     type: string
 *                     example: "0987654321"
 *                   email:
 *                     type: string
 *                     example: "nguyenvana@example.com"
 *                   address:
 *                     type: string
 *                     example: "123 Street, Hanoi"
 *                   customer_notes:
 *                     type: string
 *                     example: "VIP customer"
 *     responses:
 *       200:
 *         description: Cập nhật khách hàng và phương tiện thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Cập nhật khách hàng và phương tiện thành công!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     customer:
 *                       $ref: '#/components/schemas/Customer'
 *                     vehicle:
 *                       $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy khách hàng hoặc phương tiện
 */
router.put("/:id", CustomerVehicleController.update);


module.exports = router;
