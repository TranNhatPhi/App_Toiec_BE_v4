const CustomerService = require("../services/customerService");
const response = require("../utils/responseHelper");

const CustomerController = {
    async getAll(req, res) {
        try {
            const customers = await CustomerService.getAll();
            return response.successResponse(res, "Lấy danh sách khách hàng thành công!", customers);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const customer = await CustomerService.getById(id);
            if (!customer) return response.notFoundResponse(res, "Không tìm thấy khách hàng!");
            return response.successResponse(res, "Lấy khách hàng thành công!", customer);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },

    async create(req, res) {
        try {
            const data = req.body;
            const newCustomer = await CustomerService.create(data);
            return response.createdResponse(res, "Tạo khách hàng thành công!", newCustomer);
        } catch (err) {
            return response.badRequestResponse(res, err.message);
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedCustomer = await CustomerService.update(id, data);
            if (!updatedCustomer) return response.notFoundResponse(res, "Không tìm thấy khách hàng!");
            return response.successResponse(res, "Cập nhật khách hàng thành công!", updatedCustomer);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await CustomerService.delete(id);
            if (!deleted) return response.notFoundResponse(res, "Không tìm thấy khách hàng!");
            return response.noContentResponse(res);
        } catch (err) {
            return response.serverErrorResponse(res, err.message);
        }
    }
};

module.exports = CustomerController;
