import { Request,Response } from "express";
import Courses from "../models/courseModel";
import { validateCourseData } from "../validation/validator";
require('express-async-errors');
import { clientSideError } from "../ErrorHandler/CustomError";
import Users from "../models/usersModel";
import { courseEnrollmentValidator } from "../validation/validator";

export const creatCourseController = async(req:Request,res:Response)=>{
    const {professor,student} = req.body;
    const result = await validateCourseData(req.body,professor,student);
    if(result instanceof Error){
        throw new clientSideError(result.message,400);
    }
    else if(result.error){
        throw new clientSideError(result.error.message,400);
    }
    else{
    const course = await Courses.create(req.body);
    res.status(201).json({
        status:"Succsess",
        Data: {
            course: course
        }
    });
}
}
export const updateCourseController = async(req:Request,res:Response)=>{

    const {professor,student} = req.body;
    const result = await validateCourseData(req.body,professor,student);
    if(result instanceof Error){
        throw new clientSideError(result.message,400);
    }
    else if(result.error){
        throw new clientSideError(result.error.message,400);
    }
        else{
        const course = await Courses.findByIdAndUpdate(req.params.courseID,req.body,{
            new : true,
            runValidators:true
        });
        res.status(201).json({
            status:"Succsess",
            Data: {
                course: course
            }
        });
    }
    }


export const deleteCourseController = async (req:Request,res:Response)=>{
            await Courses.findByIdAndDelete(req.params.courseID);
            res.status(204).json({
                status:"succsess"
            });
    }

    export const viewEnrolledStudentsController= async(req:Request,res:Response)=>{
        const course = await Courses.findById(req.params.courseID);
        if(!course){ 
            throw new clientSideError('course not found', 400);
        }
        else{
        res.status(200).json({
            status: "Succsess",
            data: {
                students : course?.students
            }
        });
    }
    }


    export const getAllCoursesController= async(re:Request,res:Response)=>{
                    const course = await Courses.find();
                    if(!course){
                        throw new clientSideError('no courses found', 400);
                    }   
                    else{
                    res.status(200).json({
                        status: "Succsess",
                        data: {courses: course}
                    });
                }
            
    }


    export const getOneCourse= async(req:Request,res:Response)=>{
            const course = await Courses.findById(req.params.courseID);
            if(!course){
                throw  new clientSideError('course not found',400);
            }
            else{
            res.status(200).json({
                status: "Succsess",
                data : {
                    course : course
                }
            });
        }
    }

export const courseEnrollmentController =  async(req:Request,res:Response)=>{
    const {student1,course1} = req.body;
    const result = await courseEnrollmentValidator(course1,student1)
    if(result instanceof Error){
        throw result;
    }
    else{
            result?.students.push(student1);
            await result?.save();
            res.status(201).json({
                status:"succsess",
                data:{
                    course:result
                }
            });
        }
        }

export const dropCourseEnrollment = async (req:Request,res:Response)=>{
    const {studentID} = req.body;
    const courseID = req.params.courseID;
    const result = await courseEnrollmentValidator(courseID,studentID)
    if(result instanceof Error){
        throw result;
    }
    else{
        result?.students.remove(studentID);
        result?.save();
        res.status(200).json({
            status: "Succsess",
            data: {courses: result}
        });
    }
}