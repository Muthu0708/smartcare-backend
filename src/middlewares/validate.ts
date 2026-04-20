
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { type ZodSchema ,ZodError } from "zod";

//validate the user schema

export const validate=(schema:ZodSchema):RequestHandler=>(req:Request,res:Response,next:NextFunction):void=>{
    try{
        schema.parse(req.body);
        next();
    }
    catch(error){
        if(error instanceof ZodError){
            next({statusCode:400,message:(error as any).errors})
        }
        else{
            next(error)
            
        }
    }
}