"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const usersController_1 = require("../Controllers/usersController");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/create', usersController_1.createUserController);
exports.userRouter.patch('/:id', usersController_1.updateUserController);
exports.userRouter.delete('/:id', usersController_1.deleteUserController);
