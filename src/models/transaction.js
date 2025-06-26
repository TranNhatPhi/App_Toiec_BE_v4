const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Transaction = sequelize.define("Transaction", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    // ✅ Số tự tăng
        primaryKey: true,
    },
    customer_id: DataTypes.INTEGER,
    booking_id: DataTypes.INTEGER,
    membership_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    payment_method: DataTypes.STRING,
    status: DataTypes.STRING,
}, {
    tableName: "transactions",
    timestamps: true,
});

// --- Associations ---

module.exports = Transaction;
