"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const coursesController_1 = require("../Controllers/coursesController");
const express_1 = require("express");
exports.courseRouter = (0, express_1.Router)();
exports.courseRouter.post('/:profID', coursesController_1.creatCourseController);
exports.courseRouter.patch('/:courseID', coursesController_1.updateCourseController);
exports.courseRouter.delete('/:courseID', coursesController_1.deleteCourseController);
exports.courseRouter.get('/:courseID/students', coursesController_1.viewEnrolledStudentsController);
exports.courseRouter.get('/', coursesController_1.getAllCoursesController);
exports.courseRouter.get('/:courseID', coursesController_1.getOneCourse);
exports.courseRouter.post('/:courseID/enroll', coursesController_1.courseEnrollmentController);
exports.courseRouter.delete('/:courseID/drop', coursesController_1.dropCourseEnrollment);
