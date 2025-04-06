const express = require("express");
const ExamController = require("../controllers/examController");
const verifyToken = require("../middlewares/authMiddleware");
const verifyRole = require("../middlewares/roleMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Quản lý các bài thi TOEIC
 */

/**
 * @swagger
 * /api/exams:
 *   get:
 *     summary: Lấy danh sách tất cả các bài thi
 *     tags: [Exams]
 *     responses:
 *       200:
 *         description: Trả về danh sách bài thi
 */
router.get("/", ExamController.getAllExams);

/**
 * @swagger
 * /api/exams/{id}:
 *   get:
 *     summary: Lấy thông tin bài thi theo ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của bài thi cần lấy
 *     responses:
 *       200:
 *         description: Trả về bài thi theo ID
 *       404:
 *         description: Không tìm thấy bài thi
 */
router.get("/:id", ExamController.getExamById);

// /**
//  * @swagger
//  * /api/exams/{id}/questions:
//  *   get:
//  *     summary: Lấy danh sách câu hỏi của bài thi với phần và câu hỏi
//  *     tags: [Exams]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID của bài thi cần lấy câu hỏi
//  *     responses:
//  *       200:
//  *         description: Trả về danh sách câu hỏi của bài thi
//  *       404:
//  *         description: Không tìm thấy câu hỏi hoặc bài thi
//  */
// router.get("/:id/questions", ExamController.getExamQuestions);
// /**
//  * @swagger
//  * /api/exams/{id}/randomize:
//  *   post:
//  *     summary: Random và lưu thứ tự câu hỏi của đề thi
//  *     tags: [Exams]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID của bài thi cần random đề
//  *       - in: query
//  *         name: expired
//  *         required: true
//  *         schema:
//  *           type: boolean
//  *           example: true
//  *         description: Chỉ random nếu expired = true. Nếu false, chỉ lấy danh sách theo thứ tự đã có.
//  *     responses:
//  *       200:
//  *         description: Trả về kết quả random hoặc danh sách câu hỏi
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: ✅ Đề thi đã được random và lưu thứ tự câu hỏi.
//  *                 data:
//  *                   type: object
//  *       400:
//  *         description: ID không hợp lệ
//  *       500:
//  *         description: Lỗi hệ thống
//  */
// router.post("/:id/randomize", ExamController.randomizeExam);

/**
 * @swagger
 * /api/exams/{id}/questions:
 *   get:
 *     summary: Lấy danh sách câu hỏi của bài thi, bao gồm các phần và từng câu hỏi
 *     tags: [Exams]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của bài thi cần lấy câu hỏi
 *       - in: query
 *         name: expired
 *         required: false
 *         schema:
 *           type: boolean
 *           example: false
 *         description: Nếu true, hệ thống sẽ random lại đề mới (ví dụ khi hết thời gian làm bài)
 *     responses:
 *       200:
 *         description: Trả về danh sách câu hỏi của bài thi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExamDetail'
 *       401:
 *         description: Chưa xác thực hoặc token không hợp lệ
 *       403:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Không tìm thấy bài thi hoặc danh sách câu hỏi
 */

router.get("/:id/questions", verifyToken, ExamController.getExamQuestions);


/**
 * @swagger
 * /api/exams/{id}/questions1:
 *   get:
 *     summary: Lấy danh sách câu hỏi của bài thi theo từng part (phân trang)
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của bài thi
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang (tương ứng với part)
 *     responses:
 *       200:
 *         description: Trả về danh sách câu hỏi của bài thi theo part
 *       404:
 *         description: Không tìm thấy câu hỏi hoặc bài thi
 */
router.get("/:id/questions1", ExamController.getExamQuestions1);


/**
 * @swagger
 * /api/exams:
 *   post:
 *     summary: Tạo một bài thi mới
 *     tags: [Exams]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "TOEIC Listening Test 3"
 *               duration:
 *                 type: string
 *                 example: "45 phút"
 *               total_questions:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Bài thi đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.post("/", verifyToken, verifyRole(1, 3), ExamController.createExam);

/**
 * @swagger
 * /api/exams/{id}:
 *   put:
 *     summary: Cập nhật thông tin bài thi
 *     tags: [Exams]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của bài thi cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "TOEIC Reading Test 2"
 *               duration:
 *                 type: string
 *                 example: "75 phút"
 *               total_questions:
 *                 type: integer
 *                 example: 120
 *     responses:
 *       200:
 *         description: Bài thi đã được cập nhật
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       404:
 *         description: Không tìm thấy bài thi
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.put("/:id", verifyToken, verifyRole(1, 3), ExamController.updateExam);

/**
 * @swagger
 * /api/exams/{id}:
 *   delete:
 *     summary: Xóa bài thi theo ID
 *     tags: [Exams]
 *     security:
 *       - BearerAuth: []  # 🔐 Yêu cầu Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của bài thi cần xóa
 *     responses:
 *       200:
 *         description: Bài thi đã được xóa thành công
 *       404:
 *         description: Không tìm thấy bài thi
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.delete("/:id", verifyToken, verifyRole(1, 3), ExamController.deleteExam);

/**
 * @swagger
 * /api/exams/process:
 *   post:
 *     summary: Xử lý bài thi bất đồng bộ
 *     tags: [Exams]
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
 *     responses:
 *       202:
 *         description: Yêu cầu đang được xử lý
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 *       401:
 *         description: Chưa đăng nhập (Missing JWT Token)
 */
router.post("/process", verifyToken, ExamController.processExamData);







module.exports = router;
