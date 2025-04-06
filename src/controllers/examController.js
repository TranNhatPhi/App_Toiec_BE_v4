const ExamService = require("../services/examService");
const {
    successResponse,
    createdResponse,
    acceptedResponse,
    notFoundResponse,
    serverErrorResponse
} = require("../utils/responseHelper");

const ExamController = {
    // 🟢 Lấy danh sách tất cả các bài thi
    async getAllExams(req, res) {
        try {
            const exams = await ExamService.getAllExams();
            return successResponse(res, "Lấy danh sách bài thi thành công", exams);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống");
        }
    },

    // 🟢 Lấy bài thi theo ID
    async getExamById(req, res) {
        try {
            const { id } = req.params;
            const exam = await ExamService.getExamById(Number(id));
            if (!exam) return notFoundResponse(res, "Bài thi không tồn tại");

            return successResponse(res, "Lấy bài thi thành công", exam);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống", error);
        }
    },

    // 🟢 Lấy danh sách câu hỏi của bài thi với phần và câu hỏi
    // async getExamQuestions(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const examQuestions = await ExamService.getExamQuestionsByExamId(Number(id));

    //         if (!examQuestions) {
    //             return notFoundResponse(res, "Bài thi không tồn tại hoặc không có câu hỏi");
    //         }

    //         return successResponse(res, "Lấy danh sách câu hỏi thành công", examQuestions);
    //     } catch (error) {
    //         return serverErrorResponse(res, "Lỗi hệ thống", error);
    //     }
    // },

    async getExamQuestions(req, res) {
        try {
            const { id } = req.params;
            const isTimeExpired = req.query.expired === "true"; // ?expired=true

            const examQuestions = await ExamService.getExamQuestionsByExamId(Number(id), isTimeExpired);

            return successResponse(res, "Lấy danh sách câu hỏi thành công", examQuestions);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi hệ thống", error);
        }
    },

    // // 🟢 Random và lấy danh sách câu hỏi của bài thi (có lưu order nếu expired = true)
    // async randomizeExam(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const expired = req.query.expired === "true";

    //         if (!id || isNaN(Number(id))) {
    //             return res.status(400).json({ message: "ID bài thi không hợp lệ" });
    //         }

    //         const result = await ExamService.randomizeExamQuestions(Number(id), expired);

    //         return res.status(200).json({
    //             message: expired ? "✅ Đề thi đã được random và lưu thứ tự câu hỏi." : "📋 Trả về danh sách câu hỏi theo thứ tự đã lưu.",
    //             data: result
    //         });
    //     } catch (error) {
    //         console.error("❌ Error in randomizeExam:", error);
    //         return res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
    //     }
    // },


    async getExamQuestions1(req, res) {
        try {
            const { id } = req.params;  // Lấy ID bài thi từ params
            const { page } = req.query;     // Lấy số trang từ query params

            console.log("🟢 DEBUG: examId =", id, "page =", page); // Log kiểm tra

            // Kiểm tra xem `examId` có hợp lệ không
            if (!id || isNaN(Number(id))) {
                return badRequestResponse(res, "ID bài thi không hợp lệ hoặc thiếu!");
            }

            // Kiểm tra nếu `page` không hợp lệ thì mặc định là 1
            const currentPage = page && !isNaN(Number(page)) ? Number(page) : 1;

            // Gọi Service để lấy câu hỏi theo `examId` và `page`
            const examData = await ExamService.getExamQuestionsByExamId1(Number(id), currentPage);

            return successResponse(res, "Lấy danh sách câu hỏi thành công", examData);
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách câu hỏi:", error);
            return serverErrorResponse(res, "Lỗi hệ thống", error);
        }
    },

    // 🟢 Tạo bài thi mới
    async createExam(req, res) {
        try {
            const newExam = await ExamService.createExam(req.body);
            return createdResponse(res, "Bài thi đã được tạo", newExam);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi tạo bài thi", error);
        }
    },

    // 🟢 Cập nhật bài thi theo ID
    async updateExam(req, res) {
        try {
            const { id } = req.params;
            const updatedExam = await ExamService.updateExam(Number(id), req.body);
            if (!updatedExam) return notFoundResponse(res, "Bài thi không tồn tại");

            return successResponse(res, "Bài thi đã được cập nhật", updatedExam);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi cập nhật bài thi");
        }
    },

    // 🔴 Xóa bài thi theo ID
    async deleteExam(req, res) {
        try {
            const { id } = req.params;
            const deletedExam = await ExamService.deleteExam(Number(id));
            if (!deletedExam) return notFoundResponse(res, "Bài thi không tồn tại");

            return successResponse(res, "Bài thi đã được xóa", deletedExam);
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi xóa bài thi");
        }
    },

    // 🔄 Xử lý bất đồng bộ (tính năng mở rộng)
    async processExamData(req, res) {
        try {
            const processId = await ExamService.processExam(req.body);
            return acceptedResponse(res, "Yêu cầu đang được xử lý", { processId });
        } catch (error) {
            return serverErrorResponse(res, "Lỗi khi xử lý yêu cầu");
        }
    }
};

module.exports = ExamController;
