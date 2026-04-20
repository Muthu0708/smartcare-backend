import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface TokenDetails{
    id:number;
    email:string;
    role?:string
}

//Generate the access and refresh token

export const generateAccessToken=(user:TokenDetails):string=>{
    return jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET as string,{ expiresIn:"15m"})
}

export const generateRefreshToken=(user:TokenDetails):string=>{
    return jwt.sign({id:user.id},process.env.JWT_REFRESH_SECRET as string,{ expiresIn:"7d"})
}