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
exports.avgCourseGradesControllers = exports.viewGradeOfStudentController = exports.assignGradeController = void 0;
const gradeModel_1 = __importDefault(require("../models/gradeModel"));
const validator_1 = require("../validation/validator");
require('express-async-errors');
const CustomError_1 = require("../ErrorHandler/CustomError");
const courseModel_1 = __importDefault(require("../models/courseModel"));
const assignGradeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student, course } = req.body;
    const result = yield (0, validator_1.validateGradesData)(req.body, student, course);
    if (result instanceof Error) {
        throw new CustomError_1.clientSideError(result.message, 400);
    }
    else if (result.error) {
        throw new CustomError_1.clientSideError(result.error.message, 400);
    }
    else {
        const grade = yield gradeModel_1.default.create(req.body);
        res.status(201).json({
            status: "Succsess",
            data: {
                grade: grade
            }
        });
    }
});
exports.assignGradeController = assignGradeController;
const viewGradeOfStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseID = req.params.courseID;
    let isOnecourse = false;
    if (courseID) {
        const course = yield courseModel_1.default.findById(courseID);
        if (!course) {
            throw new CustomError_1.clientSideError('course does not exist', 400);
            return;
        }
        isOnecourse = true;
    }
    let grade;
    if (isOnecourse) {
        grade = yield gradeModel_1.default.findOne({ student: req.params.stuID, course: courseID });
    }
    else {
        grade = yield gradeModel_1.default.find({ student: req.params.stuID });
    }
    if (!grade) {
        throw new CustomError_1.clientSideError('student do not exist', 400);
    }
    else {
        res.status(200).json({
            status: "succsess",
            data: {
                grade: grade
            }
        });
    }
});
exports.viewGradeOfStudentController = viewGradeOfStudentController;
const avgCourseGradesControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course1 = yield courseModel_1.default.findById(req.params.courseID);
    console.log(course1);
    console.log('hiii');
    if (!course1) {
        throw new CustomError_1.clientSideError('course not found', 400);
    }
    else {
        const grades = yield gradeModel_1.default.aggregate([
            { $match: { course: course1 } },
            { $group: {
                    _id: 0,
                    average: { $avg: '$grade' }
                }
            }
        ]);
        res.status(200).json({
            status: "succsess",
            data: {
                grade: grades
            }
        });
    }
});
exports.avgCourseGradesControllers = avgCourseGradesControllers;
