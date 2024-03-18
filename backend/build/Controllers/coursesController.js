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
exports.dropCourseEnrollment = exports.courseEnrollmentController = exports.getOneCourse = exports.getAllCoursesController = exports.viewEnrolledStudentsController = exports.deleteCourseController = exports.updateCourseController = exports.creatCourseController = void 0;
const courseModel_1 = __importDefault(require("../models/courseModel"));
const validator_1 = require("../validation/validator");
require('express-async-errors');
const CustomError_1 = require("../ErrorHandler/CustomError");
const validator_2 = require("../validation/validator");
const creatCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { professor, student } = req.body;
    const result = yield (0, validator_1.validateCourseData)(req.body, professor, student);
    if (result instanceof Error) {
        throw new CustomError_1.clientSideError(result.message, 400);
    }
    else if (result.error) {
        throw new CustomError_1.clientSideError(result.error.message, 400);
    }
    else {
        const course = yield courseModel_1.default.create(req.body);
        res.status(201).json({
            status: "Succsess",
            Data: {
                course: course
            }
        });
    }
});
exports.creatCourseController = creatCourseController;
const updateCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { professor, student } = req.body;
    const result = yield (0, validator_1.validateCourseData)(req.body, professor, student);
    if (result instanceof Error) {
        throw new CustomError_1.clientSideError(result.message, 400);
    }
    else if (result.error) {
        throw new CustomError_1.clientSideError(result.error.message, 400);
    }
    else {
        const course = yield courseModel_1.default.findByIdAndUpdate(req.params.courseID, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: "Succsess",
            Data: {
                course: course
            }
        });
    }
});
exports.updateCourseController = updateCourseController;
const deleteCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield courseModel_1.default.findByIdAndDelete(req.params.courseID);
    res.status(204).json({
        status: "succsess"
    });
});
exports.deleteCourseController = deleteCourseController;
const viewEnrolledStudentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseModel_1.default.findById(req.params.courseID);
    if (!course) {
        throw new CustomError_1.clientSideError('course not found', 400);
    }
    else {
        res.status(200).json({
            status: "Succsess",
            data: {
                students: course === null || course === void 0 ? void 0 : course.students
            }
        });
    }
});
exports.viewEnrolledStudentsController = viewEnrolledStudentsController;
const getAllCoursesController = (re, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseModel_1.default.find();
    if (!course) {
        throw new CustomError_1.clientSideError('no courses found', 400);
    }
    else {
        res.status(200).json({
            status: "Succsess",
            data: { courses: course }
        });
    }
});
exports.getAllCoursesController = getAllCoursesController;
const getOneCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseModel_1.default.findById(req.params.courseID);
    if (!course) {
        throw new CustomError_1.clientSideError('course not found', 400);
    }
    else {
        res.status(200).json({
            status: "Succsess",
            data: {
                course: course
            }
        });
    }
});
exports.getOneCourse = getOneCourse;
const courseEnrollmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student1, course1 } = req.body;
    const result = yield (0, validator_2.courseEnrollmentValidator)(course1, student1);
    if (result instanceof Error) {
        throw result;
    }
    else {
        result === null || result === void 0 ? void 0 : result.students.push(student1);
        yield (result === null || result === void 0 ? void 0 : result.save());
        res.status(201).json({
            status: "succsess",
            data: {
                course: result
            }
        });
    }
});
exports.courseEnrollmentController = courseEnrollmentController;
const dropCourseEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentID } = req.body;
    const courseID = req.params.courseID;
    const result = yield (0, validator_2.courseEnrollmentValidator)(courseID, studentID);
    if (result instanceof Error) {
        throw result;
    }
    else {
        result === null || result === void 0 ? void 0 : result.students.remove(studentID);
        result === null || result === void 0 ? void 0 : result.save();
        res.status(200).json({
            status: "Succsess",
            data: { courses: result }
        });
    }
});
exports.dropCourseEnrollment = dropCourseEnrollment;
