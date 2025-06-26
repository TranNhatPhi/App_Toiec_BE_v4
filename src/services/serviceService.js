// services/serviceService.js
const Service = require("../models/service");

const ServiceService = {
    async getServicesGroupedByCategory() {
        const all = await Service.findAll({ order: [["price", "ASC"]] });

        const grouped = all.reduce((acc, service) => {
            const category = service.category?.toUpperCase().replace(/\s/g, "_") || "UNCATEGORIZED";
            if (!acc[category]) acc[category] = [];
            acc[category].push(service);
            return acc;
        }, {});

        return grouped;
    },
};

module.exports = ServiceService;
