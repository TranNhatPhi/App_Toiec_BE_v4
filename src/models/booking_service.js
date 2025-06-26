const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const BookingService = sequelize.define("BookingService", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    // ✅ Số tự tăng
        primaryKey: true,
    },
    booking_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
}, {
    tableName: "booking_services",
    timestamps: true,
});
// --- Associations ---


module.exports = BookingService;
