import type { NextFunction, Request, Response } from "express";

export const authorizeRoles = (...roles:any) => {
  return (req:Request, res:Response, next:NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};