const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Service = sequelize.define("Service", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    // ✅ Số tự tăng
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    duration: DataTypes.INTEGER,
    category: DataTypes.STRING,
}, {
    tableName: "services",
    timestamps: true,
});
// --- Associations ---
// ... Service define ở trên

module.exports = Service;
