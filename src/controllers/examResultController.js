const ExamResultService = require("../services/examResultService");
const { successResponse, createdResponse, notFoundResponse, serverErrorResponse, badRequestResponse } = require("../utils/responseHelper");

const ExamResultController = {
    // 🟢 Lấy tất cả kết quả bài thi
    async getAllExamResults(req, res) {
        try {
            const results = await ExamResultService.getAllExamResults();
            return successResponse(res, "Lấy danh sách kết quả bài thi thành công", results);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống khi lấy kết quả bài thi");
        }
    },
    // 🟢 Lấy tất cả kết quả bài thi
    async getAllExamResults1(req, res) {
        try {
            const results = await ExamResultService.getAllExamResults1();
            return successResponse(res, "Lấy danh sách kết quả bài thi thành công", results);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống khi lấy kết quả bài thi");
        }
    },
    // 🟢 Phân trang kết quả bài thi
    async getExamResultsWithPagination(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const results = await ExamResultService.getExamResultsWithPagination(page, limit);
            return successResponse(res, "Lấy kết quả bài thi theo phân trang thành công", results);
        } catch (error) {
            console.error("❌ Lỗi khi phân trang kết quả bài thi:", error);
            return serverErrorResponse(res, "Lỗi khi phân trang kết quả bài thi");
        }
    },

    // 🟢 Lấy kết quả bài thi theo ID
    async getExamResultById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return badRequestResponse(res, "ID không hợp lệ");

            const result = await ExamResultService.getExamResultById(id);
            if (!result) return notFoundResponse(res, "Không tìm thấy kết quả bài thi");

            return successResponse(res, "Lấy kết quả bài thi thành công", result);
        } catch (error) {
            console.error("❌ Lỗi khi lấy kết quả bài thi:", error);
            return serverErrorResponse(res, "Lỗi khi lấy kết quả bài thi");
        }
    },

    // 🟢 Lấy tất cả kết quả của một user
    async getExamResultsByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const results = await ExamResultService.getExamResultsByUserId(Number(user_id));
            return successResponse(res, "Lấy danh sách kết quả bài thi của user thành công", results);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi lấy kết quả bài thi của user");
        }
    },

    // 🟢 Lấy chi tiết kết quả bài thi (bao gồm thông tin user và bài thi)
    async getExamResultWithDetails(req, res) {
        try {
            const { id } = req.params;
            const result = await ExamResultService.getExamResultWithDetails(Number(id));

            if (!result) return notFoundResponse(res, "Không tìm thấy kết quả bài thi");

            return successResponse(res, "Lấy chi tiết kết quả bài thi thành công", result);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi lấy chi tiết kết quả bài thi");
        }
    },

    // 🟢 Tạo kết quả bài thi
    async createExamResult(req, res) {
        try {
            const newResult = await ExamResultService.createExamResult(req.body);
            return createdResponse(res, "Kết quả bài thi đã được lưu", newResult);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi lưu kết quả bài thi");
        }
    },

    // 🟢 Cập nhật kết quả bài thi
    async updateExamResult(req, res) {
        try {
            const { id } = req.params;
            const updatedResult = await ExamResultService.updateExamResult(id, req.body);

            if (!updatedResult) {
                return notFoundResponse(res, "Không tìm thấy kết quả bài thi");
            }

            return successResponse(res, "Cập nhật kết quả bài thi thành công", updatedResult);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống khi cập nhật bài thi");
        }
    },

    // 🟢 Nộp bài thi và tính toán kết quả
    async submitExamAnswers(req, res) {
        try {
            // 🔹 Lấy user_id từ token đã xác thực
            const user_id = req.user.userId;

            // 🔹 Lấy dữ liệu từ request body
            const { exam_id, answers, completed_time } = req.body;

            // 🔹 Kiểm tra dữ liệu đầu vào
            if (!exam_id || !answers || !Array.isArray(answers)) {
                return badRequestResponse(res, "Dữ liệu đầu vào không hợp lệ! Cần exam_id, danh sách câu trả lời.");
            }

            // 🔹 Gọi service để xử lý kết quả bài thi
            const result = await ExamResultService.submitExamAnswers(user_id, exam_id, answers, completed_time);

            return successResponse(res, "Bài thi đã được nộp thành công!", result);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống khi nộp bài thi!");
        }
    },

    // 🟢 Xóa kết quả bài thi
    async deleteExamResult(req, res) {
        try {
            const { id } = req.params;
            const deleted = await ExamResultService.deleteExamResult(Number(id));
            if (!deleted) return notFoundResponse(res, "Không tìm thấy kết quả bài thi");

            return successResponse(res, "Kết quả bài thi đã được xóa", deleted);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi xóa kết quả bài thi");
        }
    },
    // 🟢 Thống kê số lần làm bài trong tháng
    async getDailyExamAttempts(req, res) {
        try {
            const data = await ExamResultService.getDailyExamAttempts();
            return successResponse(res, "Số lượt thi mỗi ngày trong tháng", data);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi thống kê số lượt thi mỗi ngày");
        }
    },
    // 🟢 Thống kê điểm trung bình trong tuần
    async getAverageScoreLast7Days(req, res) {
        try {
            const avgScore = await ExamResultService.getAverageScoreLast7Days();
            return successResponse(
                res,
                "Điểm trung bình trong 7 ngày gần đây",
                avgScore
            );
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi lấy điểm trung bình trong 7 ngày gần đây");
        }
    }




};

module.exports = ExamResultController;
