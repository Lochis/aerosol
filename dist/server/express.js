"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
//import userRoutes from './routes/user.routes.js'
//import authRoutes from './routes/auth.routes.js'
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express_1.default.static(path_1.default.join(CURRENT_WORKING_DIR, 'dist')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//app.use('/', userRoutes)
//app.use('/', authRoutes)
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message });
    }
    else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message });
        console.log(err);
    }
});
exports.default = app;
//# sourceMappingURL=express.js.map