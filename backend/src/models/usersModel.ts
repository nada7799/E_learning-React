import { NextFunction } from "express";
import mongoose from "mongoose";
const bcrypt = require('bcrypt');
const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"a first name should be specified"]
    },
    lastName: {
        type: String,
        required: [true,"a last name should be specified"]
    },
    email: {
        type: String,
        required: [true,"an email  should be specified"],
        unique:[true,"an email should be unique"]
    },
    password:{
        type: String,
        required: [true,"a password should be specified"]
    },
    role:{
        type: String,
        enum: ['student','professor'],
        default: 'student',
        required: [true,"a role should be specified"]
    }
},
{timestamps:true});
// a function to call to encrypt the password before saving the user
usersSchema.pre('save',async function(next){
    try{
        // if(!(this.isModified('password'))){
        //     console.log('here');
        //     return next();
        // }
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(this.password,salt);
        this.password= hashedpass;
        console.log(this.password)
        next();
    }catch(error:any){
        next(error);
    }
});
const Users= mongoose.model('Users',usersSchema);
export default Users; 