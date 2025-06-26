const Customer = require('./customer');
const Vehicle = require('./vehicle');
const Booking = require('./booking');
const BookingService = require('./booking_service');
const Transaction = require('./transaction');
const Membership = require('./membership');
const Service = require('./service');
const Message = require('./message');
const User = require('./user');

// --- Associations --

Customer.belongsTo(Membership, { foreignKey: "membership_id" });
Membership.hasMany(Customer, { foreignKey: "membership_id" });

Vehicle.belongsTo(Customer, { foreignKey: "customer_id" });
Customer.hasMany(Vehicle, { foreignKey: "customer_id" });

Booking.belongsTo(Customer, { foreignKey: "customer_id" });
Customer.hasMany(Booking, { foreignKey: "customer_id" });

Booking.belongsTo(Vehicle, { foreignKey: "vehicle_id" });
Vehicle.hasMany(Booking, { foreignKey: "vehicle_id" });

Booking.hasMany(BookingService, { foreignKey: "booking_id" });
BookingService.belongsTo(Booking, { foreignKey: "booking_id" });

BookingService.belongsTo(Service, { foreignKey: "service_id" });
Service.hasMany(BookingService, { foreignKey: "service_id" });

Transaction.belongsTo(Booking, { foreignKey: "booking_id" });
Booking.hasOne(Transaction, { foreignKey: "booking_id" });

Transaction.belongsTo(Customer, { foreignKey: "customer_id" });
Customer.hasMany(Transaction, { foreignKey: "customer_id" });

Transaction.belongsTo(Membership, { foreignKey: "membership_id" });
Membership.hasMany(Transaction, { foreignKey: "membership_id" });

Message.belongsTo(Customer, { foreignKey: "customer_id" });
Customer.hasMany(Message, { foreignKey: "customer_id" });

// === Tracking Booking - User (creator, updater) ===
Booking.belongsTo(User, { as: "creator", foreignKey: "created_by" });
Booking.belongsTo(User, { as: "updater", foreignKey: "updated_by" });
User.hasMany(Booking, { as: "createdBookings", foreignKey: "created_by" });
User.hasMany(Booking, { as: "updatedBookings", foreignKey: "updated_by" });

module.exports = {}; // Không export gì cũng được
