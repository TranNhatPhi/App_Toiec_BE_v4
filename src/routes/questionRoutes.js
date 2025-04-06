const express = require("express");
const QuestionController = require("../controllers/questionController");
const verifyToken = require("../middlewares/authMiddleware");
const { upload, optimizeImage } = require("../middlewares/uploadMiddleware");
const verifyRole = require("../middlewares/roleMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Quản lý câu hỏi cho các phần thi TOEIC
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Lấy danh sách tất cả các câu hỏi
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Trả về danh sách câu hỏi
 */
router.get("/", QuestionController.getAllQuestions);

/**
 * @swagger
 * /api/questions/paginate:
 *   get:
 *     summary: Lấy danh sách câu hỏi có phân trang
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng câu hỏi mỗi trang
 *     responses:
 *       200:
 *         description: Trả về danh sách câu hỏi theo phân trang
 */
router.get("/paginate", QuestionController.getPaginatedQuestions);

/**
 * @swagger
 * /api/questions/countallquestion:
 *   get:
 *     summary: Lấy tổng số câu hỏi
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Trả về tổng số câu hỏi
 *         
 */
router.get("/countallquestion", QuestionController.getTotalQuestionCount);


/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Lấy thông tin câu hỏi theo ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của câu hỏi cần lấy
 *     responses:
 *       200:
 *         description: Trả về câu hỏi theo ID
 *       404:
 *         description: Không tìm thấy câu hỏi
 */
router.get("/:id", QuestionController.getQuestionById);

/**
 * @swagger
 * /api/questions/part/{part_id}:
 *   get:
 *     summary: Lấy danh sách câu hỏi theo part_id
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: part_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của phần thi cần lấy câu hỏi
 *     responses:
 *       200:
 *         description: Trả về danh sách câu hỏi theo part_id
 *       404:
 *         description: Không tìm thấy câu hỏi cho phần này
 */
router.get("/part/:part_id", QuestionController.getQuestionsByPart);

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Tạo một câu hỏi mới
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exam_id:
 *                 type: integer
 *                 example: 1
 *               part_id:
 *                 type: integer
 *                 example: 3
 *               question_text:
 *                 type: string
 *                 example: "What is the capital of France?"
 *               option_a:
 *                 type: string
 *                 example: "Paris"
 *               option_b:
 *                 type: string
 *                 example: "London"
 *               option_c:
 *                 type: string
 *                 example: "Berlin"
 *               option_d:
 *                 type: string
 *                 example: "Madrid"
 *               correct_answer:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Câu hỏi đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.post("/", verifyToken, verifyRole(1, 3), QuestionController.createQuestion);

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Cập nhật thông tin câu hỏi
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của câu hỏi cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question_text
 *               - option_a
 *               - option_b
 *               - option_c
 *               - option_d
 *               - correct_answer
 *             properties:
 *               question_text:
 *                 type: string
 *                 example: "What is the capital of France?"
 *               option_a:
 *                 type: string
 *                 example: "Berlin"
 *               option_b:
 *                 type: string
 *                 example: "Madrid"
 *               option_c:
 *                 type: string
 *                 example: "Paris"
 *               option_d:
 *                 type: string
 *                 example: "Rome"
 *               correct_answer:
 *                 type: string
 *                 enum: [A, B, C, D]
 *                 example: "C"
 *                 description: Đáp án đúng phải là A/B/C/D
 *     responses:
 *       200:
 *         description: ✅ Câu hỏi đã được cập nhật thành công
 *       400:
 *         description: ❌ Dữ liệu đầu vào không hợp lệ
 *       401:
 *         description: ❌ Chưa đăng nhập (thiếu hoặc sai token)
 *       403:
 *         description: ❌ Không có quyền (chỉ Admin hoặc Moderator mới được cập nhật)
 *       404:
 *         description: ❌ Không tìm thấy câu hỏi theo ID
 */

router.put("/:id", verifyToken, verifyRole(1, 3), QuestionController.updateQuestion);

/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Xóa câu hỏi theo ID
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của câu hỏi cần xóa
 *     responses:
 *       200:
 *         description: Câu hỏi đã được xóa thành công
 *       404:
 *         description: Không tìm thấy câu hỏi
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.delete("/:id", verifyToken, verifyRole(1, 3), QuestionController.deleteQuestion);

/**
 * @swagger
 * /api/questions/upload/{id}:
 *   post:
 *     summary: Upload ảnh câu hỏi Part 1
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của câu hỏi cần cập nhật ảnh
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: Chọn file ảnh để upload
 *     responses:
 *       201:
 *         description: Ảnh đã được upload thành công
 *       400:
 *         description: File không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */
router.post("/upload/:id", verifyToken, upload, optimizeImage, QuestionController.uploadQuestionImage);

/**
 * @swagger
 * /api/questions/remove-image/{id}:
 *   delete:
 *     summary: Xóa ảnh câu hỏi
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của câu hỏi cần xóa ảnh
 *     responses:
 *       200:
 *         description: Ảnh đã được xóa thành công
 *       404:
 *         description: Không tìm thấy câu hỏi
 *       401:
 *         description: Chưa đăng nhập
 */
router.delete("/remove-image/:id", verifyToken, QuestionController.removeQuestionImage);
/**
 * @swagger
 * /api/questions/import-csv:
 *   post:
 *     summary: Import câu hỏi từ file CSV
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File CSV chứa danh sách câu hỏi
 *     responses:
 *       200:
 *         description: Import thành công và trả về danh sách câu hỏi đã thêm
 *       400:
 *         description: File CSV không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       500:
 *         description: Lỗi hệ thống khi xử lý file CSV
 */
router.post("/import-csv", verifyToken, verifyRole(1, 3), QuestionController.uploadCsv.single("file"), QuestionController.importFromCSV);


module.exports = router;
