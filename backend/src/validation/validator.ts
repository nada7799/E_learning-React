import Joi from "joi";
import Users from "../models/usersModel";
import { error } from "console";
import { Error } from "mongoose";
import Courses from "../models/courseModel";
import { clientSideError } from "../ErrorHandler/CustomError";
export const validateUserData =(data:JSON)=>{
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
    });
    return schema.validate(data,{abortEarly:false});
};
export const validateCourseData = async(data:JSON,professor:String,student:String)=>{
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().max(500),
        image: Joi.string(),
        professor: Joi.required(),
    });
    const user1 =  await Users.findById(professor);
    if(!user1){
        return new Error("Professor not found");
    }
    if(user1?.role == "student"){
        return new Error("You are not a professor");
    }
    // const user2 = await Users.findById(student);
    // if(user2?.role == "professor"){
    //     return new Error("you are not a student");
    // }
    return schema.validate(data,{abortEarly:false});
};
export const validateGradesData =async (data:JSON,student:string,course:string)=>{
    const schema = Joi.object({
        student:Joi.required(),
        course:Joi.required(),
        grade:Joi.number().integer().min(0).max(100).required(),
        feedback:Joi.string().max(500)
    });
    const user = await Users.findById(student);
    if(!user){
        return new Error('student is not found');
    }
    if(user?.role == 'professor'){
        return new Error('you are not a student');
    }
    console.log(course);
    const course1 = await Courses.findById(course);
    console.log(course1);
    if(!course1){
        return new clientSideError('course not found',400);
    }
    return schema.validate(data,{abortEarly:false}); 
}
export const courseEnrollmentValidator = async(course:string,student:string)=>{
    const course1 = await Courses.findById(course);
    if(!course1){
        return new clientSideError('course not found', 400);
    }
    const student1 = await Users.findById(student);
    if(!student1){
        return new clientSideError('student is not found',400);
    }
    if(student1?.role == "professor"){
        return new clientSideError('you are not a student',400);
    }
    return course1;
}


