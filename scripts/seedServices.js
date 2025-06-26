// scripts/seedServices.js
const { Service } = require("../src/models");
const services = [
    { name: "Outside Sedan", price: 15, category: "WASHES" },
    { name: "Outside SUV", price: 18, category: "WASHES" },
    { name: "Outside 4WD", price: 22, category: "WASHES" },
    { name: "Full Sedan", price: 25, category: "WASHES" },
    { name: "Full SUV", price: 30, category: "WASHES" },
    { name: "Full 4WD", price: 35, category: "WASHES" },
    { name: "Polish Sedan", price: 40, category: "WASHES" },
    { name: "Polish SUV", price: 45, category: "WASHES" },
    { name: "Polish 4WD", price: 50, category: "WASHES" },
    { name: "Express Wash", price: 12, category: "WASHES" },
    { name: "Premium Small", price: 55, category: "WASHES" },
    { name: "Premium Large", price: 65, category: "WASHES" },
    { name: "Hand Wax", price: 35, category: "DETAILING" },
    { name: "Leather Clean", price: 30, category: "DETAILING" },
    { name: "Carpet Steam", price: 25, category: "DETAILING" },
    { name: "Seat Steam", price: 28, category: "DETAILING" },
    { name: "Cut & Polish", price: 45, category: "DETAILING" },
    { name: "Interior Steam", price: 32, category: "DETAILING" },
    { name: "Full Detail", price: 80, category: "DETAILING" },
    { name: "Mini Detail", price: 40, category: "DETAILING" },
    { name: "Paint Fix", price: 55, category: "DETAILING" },
    { name: "Clay Treatment", price: 38, category: "DETAILING" },
    { name: "Swirl Removal", price: 42, category: "DETAILING" },
    { name: "Machine Polish", price: 48, category: "DETAILING" },
    { name: "Door Scratches", price: 8, category: "ADDONS" },
    { name: "Bug/Tar Removal", price: 12, category: "ADDONS" },
    { name: "Trim Polish", price: 15, category: "ADDONS" },
    { name: "Mat Steam Clean", price: 20, category: "ADDONS" },
    { name: "Protective Wax", price: 10, category: "ADDONS" },
    { name: "Dash Detail", price: 18, category: "ADDONS" },
    { name: "Clay Bar", price: 25, category: "ADDONS" },
    { name: "Miscellaneous", price: 5, category: "ADDONS" },
    { name: "Tire Shine", price: 7, category: "ADDONS" },
    { name: "Air Freshener", price: 6, category: "ADDONS" },
    { name: "Glass Treatment", price: 14, category: "ADDONS" },
    { name: "Headlight Fix", price: 22, category: "ADDONS" },
    { name: "Interior Shield", price: 60, category: "NEW_CAR_PROTECTION" },
    { name: "Paint Shield", price: 120, category: "NEW_CAR_PROTECTION" },
    { name: "Scratch Repair", price: 80, category: "NEW_CAR_PROTECTION" },
    { name: "Wheel Repair", price: 50, category: "NEW_CAR_PROTECTION" },
    { name: "Bumper Fix", price: 70, category: "NEW_CAR_PROTECTION" },
    { name: "Panel Repair", price: 90, category: "NEW_CAR_PROTECTION" },
    { name: "Ceramic Coat", price: 150, category: "NEW_CAR_PROTECTION" },
    { name: "Paint Sealant", price: 85, category: "NEW_CAR_PROTECTION" },
    { name: "Under Shield", price: 95, category: "NEW_CAR_PROTECTION" },
    { name: "Glass Film", price: 75, category: "NEW_CAR_PROTECTION" },
    { name: "Rust Shield", price: 65, category: "NEW_CAR_PROTECTION" },
    { name: "Chip Repair", price: 45, category: "NEW_CAR_PROTECTION" }
];

(async () => {
    try {
        await Service.bulkCreate(services);
        console.log("✅ Inserted all services!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error inserting services:", err);
        process.exit(1);
    }
})();
