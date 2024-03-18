import mongoose from "mongoose";
import Courses from "./courseModel";
import Users from "./usersModel";

const gradeSchema = new mongoose.Schema({
student: {
    type:mongoose.Types.ObjectId,
    ref:"Users",
    required:[true,"a student should be specified"]
},
course:{
    type:mongoose.Types.ObjectId,
    ref:"Courses",
    required:[true,"a course should be specified"]
},
grade:{
    type:Number,
    required:[true,"a grade should be specified"]
},
feedback:{
    type:String,
    optional:true
},

},
{timestamps:true});

const Grade = mongoose.model('Grade',gradeSchema);
export default Grade;