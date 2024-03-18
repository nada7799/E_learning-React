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
exports.courseEnrollmentValidator = exports.validateGradesData = exports.validateCourseData = exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const mongoose_1 = require("mongoose");
const courseModel_1 = __importDefault(require("../models/courseModel"));
const CustomError_1 = require("../ErrorHandler/CustomError");
const validateUserData = (data) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().required(),
    });
    return schema.validate(data, { abortEarly: false });
};
exports.validateUserData = validateUserData;
const validateCourseData = (data, professor, student) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().max(500),
        image: joi_1.default.string(),
        professor: joi_1.default.required(),
    });
    const user1 = yield usersModel_1.default.findById(professor);
    if (!user1) {
        return new mongoose_1.Error("Professor not found");
    }
    if ((user1 === null || user1 === void 0 ? void 0 : user1.role) == "student") {
        return new mongoose_1.Error("You are not a professor");
    }
    // const user2 = await Users.findById(student);
    // if(user2?.role == "professor"){
    //     return new Error("you are not a student");
    // }
    return schema.validate(data, { abortEarly: false });
});
exports.validateCourseData = validateCourseData;
const validateGradesData = (data, student, course) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        student: joi_1.default.required(),
        course: joi_1.default.required(),
        grade: joi_1.default.number().integer().min(0).max(100).required(),
        feedback: joi_1.default.string().max(500)
    });
    const user = yield usersModel_1.default.findById(student);
    if (!user) {
        return new mongoose_1.Error('student is not found');
    }
    if ((user === null || user === void 0 ? void 0 : user.role) == 'professor') {
        return new mongoose_1.Error('you are not a student');
    }
    console.log(course);
    const course1 = yield courseModel_1.default.findById(course);
    console.log(course1);
    if (!course1) {
        return new CustomError_1.clientSideError('course not found', 400);
    }
    return schema.validate(data, { abortEarly: false });
});
exports.validateGradesData = validateGradesData;
const courseEnrollmentValidator = (course, student) => __awaiter(void 0, void 0, void 0, function* () {
    const course1 = yield courseModel_1.default.findById(course);
    if (!course1) {
        return new CustomError_1.clientSideError('course not found', 400);
    }
    const student1 = yield usersModel_1.default.findById(student);
    if (!student1) {
        return new CustomError_1.clientSideError('student is not found', 400);
    }
    if ((student1 === null || student1 === void 0 ? void 0 : student1.role) == "professor") {
        return new CustomError_1.clientSideError('you are not a student', 400);
    }
    return course1;
});
exports.courseEnrollmentValidator = courseEnrollmentValidator;
