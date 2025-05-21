"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || http_status_1.default.INTERNAL_SERVER_ERROR;
    const message = (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong";
    const stack = (error === null || error === void 0 ? void 0 : error.stack) || null;
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        statusCode,
        message,
        error,
        stack,
    });
});
exports.globalErrorHandler = globalErrorHandler;
