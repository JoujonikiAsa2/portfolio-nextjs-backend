"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundErrorHandler = void 0;
const notFoundErrorHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        path: req.path,
    });
};
exports.notFoundErrorHandler = notFoundErrorHandler;
