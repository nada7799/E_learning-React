import { NextFunction } from "express";
import { Request,Response } from "express";
require('express-async-errors');
export const GlobalErrorHandler = (error:any,req:Request,res:Response,next:NextFunction)=>{
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
}
