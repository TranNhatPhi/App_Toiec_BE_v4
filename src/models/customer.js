const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Customer = sequelize.define("Customer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    // ✅ Số tự tăng
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    joined_at: DataTypes.DATE,
    tags: DataTypes.TEXT,
    membership_id: DataTypes.INTEGER
}, {
    tableName: "customers",
    timestamps: true,
});

// ... Customer define ở trên



module.exports = Customer;
