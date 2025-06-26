const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Vehicle = sequelize.define("Vehicle", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id',
        }
    },
    make: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active",
    },
    last_wash_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    wash_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    internal_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    wash_status: { // Trạng thái rửa xe hiện tại
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No active wash", // hoặc "Idle", "Washing", "Completed", "Queued", ...
    }
}, {
    tableName: "vehicles",
    timestamps: true,
});

module.exports = Vehicle;
