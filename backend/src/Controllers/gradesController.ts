import { Request,Response } from "express";
import Grade from "../models/gradeModel";
import { validateGradesData } from "../validation/validator";
require('express-async-errors');
import { clientSideError } from "../ErrorHandler/CustomError";
import Courses from "../models/courseModel";
import { gradesRouter } from "../Routes/gradesRouter";
export const assignGradeController= async(req:Request,res:Response)=>{
            const {student, course} = req.body;
            const result = await validateGradesData(req.body,student,course);
            if(result instanceof Error){
                throw new clientSideError(result.message,400);
            }
            else if(result.error){
                throw new clientSideError(result.error.message, 400); 
            }
            else{
            const grade = await Grade.create(req.body);
            res.status(201).json({
                status: "Succsess",
                data: {
                    grade : grade
                }
            });
        }
}

export const viewGradeOfStudentController = async(req:Request,res:Response)=>{
            const courseID = req.params.courseID;
            let isOnecourse = false;
            if(courseID){
                const course = await Courses.findById(courseID);
                if(!course){
                    throw new clientSideError('course does not exist',400);
                    return;
                }
                isOnecourse=true;
            }
            let grade;
            if(isOnecourse){
                grade = await Grade.findOne({student : req.params.stuID, course: courseID});
            }
            else{
            grade = await Grade.find({student : req.params.stuID});
            }
            if(!grade){
                throw new clientSideError('student do not exist',400);
            }
            else{
            res.status(200).json({
                status: "succsess",
                data : {
                    grade : grade
                }
            });
        }
}


export const avgCourseGradesControllers = async (req:Request,res:Response)=>{
    const course1 = await Courses.findById(req.params.courseID);
    console.log(course1);
    console.log('hiii');
    if(!course1){
        throw new clientSideError('course not found',400);
    }else{
        const grades = await Grade.aggregate([
            {$match: {course:course1} },
            {$group : {
                _id : 0,
                average : {$avg: '$grade'}
            }
        }
    ]);
        res.status(200).json({
            status: "succsess",
                data : {
                    grade : grades
                }
        });
    }
}