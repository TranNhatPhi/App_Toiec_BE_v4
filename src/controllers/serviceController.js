// controllers/serviceController.js
const ServiceService = require("../services/serviceService");
const response = require("../utils/responseHelper");

const ServiceController = {
    async getAllGrouped(req, res) {
        try {
            const grouped = await ServiceService.getServicesGroupedByCategory();
            return response.successResponse(res, "Lấy danh sách dịch vụ thành công!", grouped);
        } catch (err) {
            return response.serverErrorResponse(res, err.message || "Lỗi server");
        }
    }
};

module.exports = ServiceController;
