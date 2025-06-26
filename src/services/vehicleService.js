// services/vehicleService.js
const Vehicle = require("../models/vehicle");
const Customer = require("../models/customer");
const { Op } = require("sequelize");

const VehicleService = {
    // 🟢 Kiểm tra sự tồn tại của biển số xe trong cơ sở dữ liệu
    async checkVehicleExistence(licensePlate) {
        try {
            const vehicle = await Vehicle.findOne({
                where: { license_plate: licensePlate },
                include: [
                    {
                        model: Customer,
                        attributes: ["id", "name", "email", "phone"]
                    }
                ]
            });

            return vehicle;  // Trả về xe nếu có, hoặc null nếu không có
        } catch (error) {
            console.error("❌ Lỗi khi kiểm tra sự tồn tại của biển số xe:", error);
            throw new Error("Không thể kiểm tra biển số xe");
        }
    },

    // 🟢 Lấy tất cả phương tiện (sắp xếp mới nhất trước)
    async getAllVehicles() {
        try {
            const vehicles = await Vehicle.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Customer,
                        attributes: ["id", "name", "email", "phone"]
                    }
                ]
            });
            return vehicles;
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách xe:", error);
            throw new Error("Không thể lấy danh sách xe");
        }
    },

    // 🟢 Lấy phương tiện với phân trang
    async getVehiclesWithPagination(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const { count, rows } = await Vehicle.findAndCountAll({
                offset,
                limit,
                order: [["id", "DESC"]],
                include: [
                    {
                        model: Customer,
                        attributes: ["id", "name", "email", "phone"]
                    }
                ]
            });

            return {
                vehicles: rows,
                total: count,
                page,
                limit,
            };
        } catch (error) {
            console.error("❌ Lỗi khi phân trang xe:", error);
            throw new Error("Không thể phân trang danh sách xe");
        }
    },

    // 🟢 Lấy xe theo ID
    async getVehicleById(id) {
        try {
            return await Vehicle.findByPk(id, {
                include: [
                    {
                        model: Customer,
                        attributes: ["id", "name", "email", "phone"]
                    }
                ]
            });
        } catch (error) {
            console.error("❌ Lỗi khi lấy xe theo ID:", error);
            throw new Error("Không thể lấy thông tin xe");
        }
    },

    // 🟢 Lấy danh sách xe theo customer_id
    async getVehiclesByCustomerId(customerId) {
        try {
            return await Vehicle.findAll({
                where: { customer_id: customerId },
                order: [["createdAt", "DESC"]]
            });
        } catch (error) {
            console.error("❌ Lỗi khi lấy xe theo khách hàng:", error);
            throw new Error("Không thể lấy danh sách xe theo khách hàng");
        }
    },

    // 🟢 Thêm mới xe
    async createVehicle(data) {
        try {
            // validate data ở đây nếu cần!
            return await Vehicle.create(data);
        } catch (error) {
            console.error("❌ Lỗi khi tạo xe:", error);
            throw new Error("Không thể tạo mới xe");
        }
    },

    // 🟢 Cập nhật xe
    async updateVehicle(id, data) {
        try {
            const vehicle = await Vehicle.findByPk(id);
            if (!vehicle) return null;
            await vehicle.update(data);
            return vehicle;
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật xe:", error);
            throw new Error("Không thể cập nhật xe");
        }
    },

    // 🟢 Xóa xe
    async deleteVehicle(id) {
        try {
            const vehicle = await Vehicle.findByPk(id);
            if (!vehicle) return null;
            await vehicle.destroy();
            return true;
        } catch (error) {
            console.error("❌ Lỗi khi xóa xe:", error);
            throw new Error("Không thể xóa xe");
        }
    },

    // 🟢 Kiểm tra dữ liệu xe (simple version)
    validateVehicleData(data) {
        if (!data.customer_id) throw new Error("Thiếu customer_id");
        if (!data.license_plate || data.license_plate.length < 5)
            throw new Error("Biển số xe không hợp lệ");
        // ... thêm validate khác nếu cần
    }
};

module.exports = VehicleService;
