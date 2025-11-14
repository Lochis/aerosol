"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_ts_1 = __importDefault(require("./server/config/config.ts"));
const express_ts_1 = __importDefault(require("./server/express.ts"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect(config_ts_1.default.mongoUri, {})
    .then(() => {
    const db = mongoose_1.default.connection;
    console.log("Connected to the database!");
    console.log("Database name: " + db.name);
    console.log("Database host: " + db.host);
    console.log("Database port: " + db.port);
});
mongoose_1.default.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${config_ts_1.default.mongoUri}`);
});
express_ts_1.default.get("/", (req, res) => {
    res.json({ message: "Aerosol API" });
});
express_ts_1.default.listen(config_ts_1.default.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info("Server started on port %s.", config_ts_1.default.port);
});
//# sourceMappingURL=server.js.map