const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Membership = sequelize.define("Membership", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    // ✅ Số tự tăng
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    period: DataTypes.STRING,
    benefits: DataTypes.TEXT, // JSON string to store benefits
    is_active: DataTypes.BOOLEAN,
}, {
    tableName: "memberships",
    timestamps: true,
});

module.exports = Membership;
