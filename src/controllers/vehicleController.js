// controllers/vehicleController.js
const VehicleService = require("../services/vehicleService");
const response = require("../utils/responseHelper");

const VehicleController = {
    // 🟢 Kiểm tra biển số xe
    async checkVehicleExistence(req, res) {
        const { rego } = req.query;  // Lấy biển số từ query parameter

        try {
            const vehicle = await VehicleService.checkVehicleExistence(rego);

            if (vehicle) {
                // Nếu tìm thấy biển số xe, trả về thông tin khách hàng và xe
                return response.successResponse(res, "Biển số xe đã tồn tại!", {
                    found: true,
                    customer: {
                        name: vehicle.Customer.name,
                        phone: vehicle.Customer.phone,
                        vehicle: vehicle.license_plate
                    }
                });
            }

            // Nếu không tìm thấy, trả về thông báo biển số xe không tồn tại
            return response.successResponse(res, "Biển số xe không tồn tại!", {
                found: false
            });
        } catch (error) {
            return response.serverErrorResponse(res, error.message);
        }
    },
    // Lấy tất cả xe
    async getAll(req, res) {
        try {
            const vehicles = await VehicleService.getAllVehicles();
            return response.successResponse(res, "Lấy danh sách xe thành công!", vehicles);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },

    // Phân trang xe
    async getWithPagination(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await VehicleService.getVehiclesWithPagination(page, limit);

            return response.successResponse(res, "Lấy danh sách xe thành công!", result);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },


    // Lấy xe theo ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const vehicle = await VehicleService.getVehicleById(id);
            if (!vehicle) {
                return response.notFoundResponse(res, "Không tìm thấy xe!");
            }
            return response.successResponse(res, "Lấy xe thành công!", vehicle);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },

    // Tạo mới xe
    async create(req, res) {
        try {
            const data = req.body;
            VehicleService.validateVehicleData(data);
            const newVehicle = await VehicleService.createVehicle(data);
            return response.createdResponse(res, "Tạo xe mới thành công!", newVehicle);
        } catch (err) {
            // Nếu lỗi do validate, trả về 400
            return response.badRequestResponse(res, err.message);
        }
    },

    // Cập nhật xe
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedVehicle = await VehicleService.updateVehicle(id, data);
            if (!updatedVehicle) {
                return response.notFoundResponse(res, "Không tìm thấy xe để cập nhật!");
            }
            return response.successResponse(res, "Cập nhật xe thành công!", updatedVehicle);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },

    // Xoá xe
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await VehicleService.deleteVehicle(id);
            if (!deleted) {
                return response.notFoundResponse(res, "Không tìm thấy xe để xoá!");
            }
            return response.noContentResponse(res); // 204 xoá thành công không có nội dung trả về
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },
};

module.exports = VehicleController;
