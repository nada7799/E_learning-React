import mongoose from "mongoose";
import Users from "./usersModel";
import exp from "constants";
import { timeStamp } from "console";
const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"a title should be specified"]
    },
    description:{
        type: String,
        optional:true
    },
    image:{
        type:String,
        optional:true
    },
    professor:{
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required:  [true,"a professor should be specified"]
    },
    students:{
        type: [mongoose.Types.ObjectId],
        ref: "Users",
        default:[]
    },
},
{timestamps:true}
);

const Courses = mongoose.model('Courses',courseSchema);
export default Courses;