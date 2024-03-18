"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
require('express-async-errors');
const GlobalErrorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
