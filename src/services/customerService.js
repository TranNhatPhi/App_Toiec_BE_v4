const Customer = require("../models/customer");

const CustomerService = {
    // Lấy tất cả khách hàng
    async getAll() {
        return await Customer.findAll({ order: [["createdAt", "DESC"]] });
    },

    // Lấy khách hàng theo ID
    async getById(id) {
        return await Customer.findByPk(id);
    },

    // Tạo mới khách hàng
    async create(data) {
        try {
            // Thêm trường createdAt và updatedAt vào dữ liệu trước khi tạo khách hàng
            const currentTime = new Date();
            // Tự động thêm createdAt và updatedAt
            const customerData = {
                ...data,
                createdAt: currentTime,
                updatedAt: currentTime
            };
            // Dữ liệu tạo mới khách hàng
            return await Customer.create(customerData);
        } catch (error) {
            console.error("Error creating customer:", error);
            throw error;
        }
    },

    // Cập nhật khách hàng
    async update(id, data) {
        try {
            const customer = await Customer.findByPk(id);
            if (!customer) return null;

            // Cập nhật customer
            await customer.update({
                ...data, // Cập nhật dữ liệu mới
                updatedAt: new Date() // Đảm bảo cập nhật thời gian hiện tại cho trường updatedAt
            });

            return customer;
        } catch (error) {
            console.error("Error updating customer:", error);
            throw error;
        }
    },

    // Xoá khách hàng
    async delete(id) {
        const customer = await Customer.findByPk(id);
        if (!customer) return null;
        await customer.destroy();
        return true;
    }
};

module.exports = CustomerService;
