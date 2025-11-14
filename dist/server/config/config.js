"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'scoobySnax',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || ''
};
exports.default = config;
//# sourceMappingURL=config.js.map