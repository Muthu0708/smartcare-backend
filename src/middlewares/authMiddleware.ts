
import type { Request, Response, NextFunction } from 'express';
import { Apierror } from '../utils/apiError.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

//Verify the token

export interface JwtPayload {
    id: number;
    role: "Patient" | "Doctor";
}


export const protect = (req: Request, res: Response, next: NextFunction): void => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new Apierror(401, "Invalid Token"))
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return next(new Apierror(400, "No Token"))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)  as JwtPayload;
        req.user = decoded;
        next();
    }
    catch {
        return next(new Apierror(401, "Invalid Token"))
    }

}