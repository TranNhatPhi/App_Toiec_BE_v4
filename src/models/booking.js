const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    // ✅ Số tự tăng
        primaryKey: true,
    },
    customer_id: DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    
    total_price: DataTypes.FLOAT,
    notes: DataTypes.TEXT,

    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' }
    }

}, {
    tableName: "bookings",
    timestamps: true,
});


module.exports = Booking;
