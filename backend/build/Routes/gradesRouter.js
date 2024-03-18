"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradesRouter = void 0;
const gradesController_1 = require("../Controllers/gradesController");
const express_1 = require("express");
exports.gradesRouter = (0, express_1.Router)();
exports.gradesRouter.post('/assign', gradesController_1.assignGradeController);
exports.gradesRouter.get('/:courseID', gradesController_1.avgCourseGradesControllers);
exports.gradesRouter.get('/:stuID/:courseID?', gradesController_1.viewGradeOfStudentController);
