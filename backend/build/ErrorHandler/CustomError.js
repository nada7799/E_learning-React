"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSideError = void 0;
class clientSideError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'clientSideError';
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.clientSideError = clientSideError;
