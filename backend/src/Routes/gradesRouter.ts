import { app } from "../app";
import {assignGradeController,viewGradeOfStudentController,avgCourseGradesControllers} from '../Controllers/gradesController'
import { Router } from "express";

export const gradesRouter = Router();
gradesRouter.post('/assign',assignGradeController);
gradesRouter.get('/:courseID',avgCourseGradesControllers);
gradesRouter.get('/:stuID/:courseID?',viewGradeOfStudentController);

