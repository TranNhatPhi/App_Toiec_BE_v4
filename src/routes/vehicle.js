const express = require("express");
const VehicleController = require("../controllers/vehicleController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Quản lý xe (Vehicle Management)
 */




/**
 * @swagger
 * /api/vehicles/check:
 *   get:
 *     summary: Kiểm tra sự tồn tại của biển số xe
 *     tags: [Vehicles]
 *     parameters:
 *       - name: rego
 *         in: query
 *         description: "Biển số xe cần kiểm tra (ví dụ: ABC123)"
 *         required: true
 *         schema:
 *           type: string
 *           example: "ABC123"
 *     responses:
 *       200:
 *         description: Biển số xe đã tồn tại trong cơ sở dữ liệu hoặc không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 found:
 *                   type: boolean
 *                   description: "Trạng thái biển số xe đã được tìm thấy trong cơ sở dữ liệu"
 *                   example: true
 *                 customer:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Nguyen Van A"
 *                     phone:
 *                       type: string
 *                       example: "0987654321"
 *                     vehicle:
 *                       type: string
 *                       example: "ABC123"
 *       404:
 *         description: Biển số xe không tồn tại trong cơ sở dữ liệu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 found:
 *                   type: boolean
 *                   description: "Trạng thái biển số xe không được tìm thấy trong cơ sở dữ liệu"
 *                   example: false
 *       500:
 *         description: Lỗi khi xử lý yêu cầu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Lỗi hệ thống, không thể xử lý yêu cầu"
 */
router.get("/check", VehicleController.checkVehicleExistence);

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Lấy danh sách tất cả xe
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Danh sách xe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 */
router.get("/", VehicleController.getAll);


/**
 * @swagger
 * /api/vehicles/pagination:
 *   get:
 *     summary: Lấy danh sách xe (có hỗ trợ phân trang)
 *     tags: [Vehicles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Trang số (page)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Số lượng mỗi trang (limit)
 *     responses:
 *       200:
 *         description: Danh sách xe (phân trang hoặc toàn bộ)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         $ref: '#/components/schemas/Vehicle'
 *                     - type: object
 *                       properties:
 *                         vehicles:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Vehicle'
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 */
router.get("/pagination", VehicleController.getWithPagination);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Lấy thông tin xe theo ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của xe
 *     responses:
 *       200:
 *         description: Lấy xe thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehicleResponse'
 *       404:
 *         description: Không tìm thấy xe
 */
router.get("/:id", VehicleController.getById);

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Tạo mới một xe
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - license_plate
 *               - wash_status
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               make:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Camry"
 *               year:
 *                 type: integer
 *                 example: 2022
 *               color:
 *                 type: string
 *                 example: "White"
 *               license_plate:
 *                 type: string
 *                 example: "30F-123.45"
 *               notes:
 *                 type: string
 *                 example: "Xe mới bảo dưỡng"
 *               status:
 *                 type: string
 *                 example: "active"
 *               last_wash_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-18T14:00:00Z"
 *               wash_count:
 *                 type: integer
 *                 example: 2
 *               photo_url:
 *                 type: string
 *                 example: "https://myserver.com/xe1.png"
 *               internal_notes:
 *                 type: string
 *                 example: "Khách thân thiết"
 *               wash_status:
 *                 type: string
 *                 example: "No active wash"
 *           example:
 *             customer_id: 1
 *             make: "Toyota"
 *             model: "Camry"
 *             year: 2022
 *             color: "White"
 *             license_plate: "30F-123.45"
 *             notes: "Xe mới bảo dưỡng"
 *             status: "active"
 *             last_wash_at: "2024-06-18T14:00:00Z"
 *             wash_count: 2
 *             photo_url: "https://myserver.com/xe1.png"
 *             internal_notes: "Khách thân thiết"
 *             wash_status: "No active wash"
 *     responses:
 *       201:
 *         description: Tạo xe mới thành công
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
 *                   example: "Tạo xe mới thành công!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     customer_id:
 *                       type: integer
 *                       example: 1
 *                     make:
 *                       type: string
 *                       example: "Toyota"
 *                     model:
 *                       type: string
 *                       example: "Camry"
 *                     year:
 *                       type: integer
 *                       example: 2022
 *                     color:
 *                       type: string
 *                       example: "White"
 *                     license_plate:
 *                       type: string
 *                       example: "30F-123.45"
 *                     notes:
 *                       type: string
 *                       example: "Xe mới bảo dưỡng"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     last_wash_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-18T14:00:00Z"
 *                     wash_count:
 *                       type: integer
 *                       example: 2
 *                     photo_url:
 *                       type: string
 *                       example: "https://myserver.com/xe1.png"
 *                     internal_notes:
 *                       type: string
 *                       example: "Khách thân thiết"
 *                     wash_status:
 *                       type: string
 *                       example: "No active wash"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-18T14:10:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-18T14:10:00Z"
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", VehicleController.create);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Cập nhật thông tin xe
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của xe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - license_plate
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               make:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Camry"
 *               year:
 *                 type: integer
 *                 example: 2022
 *               color:
 *                 type: string
 *                 example: "White"
 *               license_plate:
 *                 type: string
 *                 example: "30F-123.45"
 *               notes:
 *                 type: string
 *                 example: "Xe mới bảo dưỡng"
 *               status:
 *                 type: string
 *                 example: "active"
 *               last_wash_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-18T14:00:00Z"
 *               wash_count:
 *                 type: integer
 *                 example: 2
 *               photo_url:
 *                 type: string
 *                 example: "https://myserver.com/xe1.png"
 *               internal_notes:
 *                 type: string
 *                 example: "Khách thân thiết"
 *               wash_status:
 *                 type: string
 *                 example: "Washing"
 *           example:
 *             customer_id: 2
 *             make: "Honda"
 *             model: "Civic"
 *             year: 2023
 *             color: "Blue"
 *             license_plate: "30B-456.78"
 *             notes: "Cập nhật thông tin xe"
 *             status: "active"
 *             last_wash_at: "2024-06-19T10:00:00Z"
 *             wash_count: 5
 *             photo_url: "https://myserver.com/xe2.png"
 *             internal_notes: "Đã thay lốp mới"
 *             wash_status: "Completed"
 *     responses:
 *       200:
 *         description: Cập nhật xe thành công
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
 *                   example: "Cập nhật xe thành công!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 102
 *                     customer_id:
 *                       type: integer
 *                       example: 2
 *                     make:
 *                       type: string
 *                       example: "Honda"
 *                     model:
 *                       type: string
 *                       example: "Civic"
 *                     year:
 *                       type: integer
 *                       example: 2023
 *                     color:
 *                       type: string
 *                       example: "Blue"
 *                     license_plate:
 *                       type: string
 *                       example: "30B-456.78"
 *                     notes:
 *                       type: string
 *                       example: "Cập nhật thông tin xe"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     last_wash_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-19T10:00:00Z"
 *                     wash_count:
 *                       type: integer
 *                       example: 5
 *                     photo_url:
 *                       type: string
 *                       example: "https://myserver.com/xe2.png"
 *                     internal_notes:
 *                       type: string
 *                       example: "Đã thay lốp mới"
 *                     wash_status:
 *                       type: string
 *                       example: "Completed"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-19T10:15:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-19T10:15:00Z"
 *       404:
 *         description: Không tìm thấy xe
 */
router.put("/:id", VehicleController.update);


/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Xóa một xe
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của xe
 *     responses:
 *       204:
 *         description: Xóa xe thành công (không có nội dung trả về)
 *       404:
 *         description: Không tìm thấy xe để xoá
 */
router.delete("/:id", VehicleController.delete);


module.exports = router;
