"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFoundErrorHandler_1 = require("./app/middlewares/notFoundErrorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send({
        message: 'Portfolio Application is running 🐱'
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFoundErrorHandler_1.notFoundErrorHandler);
exports.default = app;
