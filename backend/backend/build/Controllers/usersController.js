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
exports.deleteUserController = exports.updateUserController = exports.createUserController = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const validator_1 = require("../validation/validator");
require('express-async-errors');
const CustomError_1 = require("../ErrorHandler/CustomError");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, validator_1.validateUserData)(req.body);
    if (result.error) {
        throw new CustomError_1.clientSideError(result.error.message, 400);
    }
    else {
        const user = yield usersModel_1.default.create(req.body);
        res.status(200).json({
            status: "Success",
            Data: { user: user }
        });
    }
});
exports.createUserController = createUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, validator_1.validateUserData)(req.body);
    if (result.error) {
        throw new CustomError_1.clientSideError(result.error.message, 400);
    }
    else {
        const user = yield usersModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            throw new CustomError_1.clientSideError('user not found', 400);
        }
        else {
            user === null || user === void 0 ? void 0 : user.save();
            res.status(201).json({
                status: "Success",
                Data: { user: user }
            });
        }
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new CustomError_1.clientSideError('user not found', 400);
    }
    res.status(204).json({
        status: "Success",
    });
});
exports.deleteUserController = deleteUserController;
