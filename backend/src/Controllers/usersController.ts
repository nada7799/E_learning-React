import mongoose from "mongoose";
import Users from "../models/usersModel";
import express, {Request, Response} from 'express';
import { validateUserData } from "../validation/validator";
require('express-async-errors');
import { clientSideError } from "../ErrorHandler/CustomError";


export const createUserController = async(req:Request,res:Response)=>{

    const result = validateUserData(req.body);
    if(result.error){
        throw new clientSideError(result.error.message,400);
    }
    else{
    const user = await Users.create(req.body);

    res.status(200).json({
        status:"Success",
        Data: {user :user}
        });
    }
}

export const updateUserController = async(req:Request,res:Response)=>{
        const result = validateUserData(req.body);
    if(result.error){
        throw new clientSideError(result.error.message,400);
    }
    else{
    const user = await Users.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    
    });
    if(!user){
        throw new clientSideError('user not found',400);
    }
    else{
    user?.save();
    res.status(201).json({
        status:"Success",
        Data: {user :user}
        });
    }
}
}
export const deleteUserController = async(req:Request,res:Response)=>{
    const user = await Users.findByIdAndDelete(req.params.id);
    if(!user){
        throw new clientSideError('user not found',400);
    }
    res.status(204).json({
        status:"Success",
        });
    
}