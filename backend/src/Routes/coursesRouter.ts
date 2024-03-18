import { creatCourseController,updateCourseController,deleteCourseController, viewEnrolledStudentsController,getAllCoursesController,getOneCourse,courseEnrollmentController,dropCourseEnrollment } from "../Controllers/coursesController";
import { Router } from "express";

export const courseRouter = Router();

courseRouter.post('/:profID',creatCourseController);
courseRouter.patch('/:courseID',updateCourseController);
courseRouter.delete('/:courseID',deleteCourseController);
courseRouter.get('/:courseID/students',viewEnrolledStudentsController);
courseRouter.get('/',getAllCoursesController);
courseRouter.get('/:courseID',getOneCourse);
courseRouter.post('/:courseID/enroll',courseEnrollmentController);
courseRouter.delete('/:courseID/drop',dropCourseEnrollment);

