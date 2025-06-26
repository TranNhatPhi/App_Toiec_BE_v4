const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,    // ✅ Số tự tăng
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: DataTypes.STRING,
    is_incoming: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: "messages",
    timestamps: false,
});



module.exports = Message;