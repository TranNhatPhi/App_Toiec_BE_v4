const VehicleService = require("../services/vehicleService");
const CustomerService = require("../services/customerService");

const CustomerVehicleController = {
    async create(req, res) {
        try {
            // Lấy dữ liệu từ request
            const { vehicle, customer } = req.body;

            // Tạo khách hàng
            const newCustomer = await CustomerService.create(customer);

            // Thêm customer_id vào vehicle trước khi tạo
            vehicle.customer_id = newCustomer.id;

            // Tạo phương tiện cho khách hàng
            const newVehicle = await VehicleService.createVehicle(vehicle);

            // Trả kết quả về cho người dùng
            return res.status(201).json({
                statusCode: 201,
                message: "Tạo khách hàng và phương tiện thành công!",
                data: {
                    customer: newCustomer,
                    vehicle: newVehicle
                }
            });
        } catch (error) {
            console.error("Error creating customer and vehicle:", error);
            return res.status(400).json({
                statusCode: 400,
                message: "Dữ liệu không hợp lệ, vui lòng kiểm tra lại"
            });
        }
    },
    async update(req, res) {
        try {
            const { vehicle, customer } = req.body;
            const { id } = req.params; // Get the customer ID from the URL parameter

            // Find the customer by ID
            const existingCustomer = await CustomerService.getById(id);
            if (!existingCustomer) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Customer not found",
                });
            }

            // Update customer information
            await CustomerService.update(id, customer);

            // Find the vehicle associated with the customer
            const existingVehicle = await VehicleService.getVehicleById(vehicle.id);
            if (!existingVehicle) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Vehicle not found",
                });
            }

            // Update vehicle information
            await VehicleService.updateVehicle(vehicle.id, vehicle);

            return res.status(200).json({
                statusCode: 200,
                message: "Customer and vehicle updated successfully",
                data: { customer: existingCustomer, vehicle: existingVehicle },
            });
        } catch (error) {
            console.error("Error updating customer and vehicle:", error);
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid data, please check again",
            });
        }
    }
};

module.exports = CustomerVehicleController;
