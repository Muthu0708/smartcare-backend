import type { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger.js";

//Handle the global error

export const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    logger.error(err.message);
    res.status(err.statusCode || 500).json({message:err.message || "Internal server error"})
};