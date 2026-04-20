import rateLimit from "express-rate-limit";

export const loginRateLimiter=rateLimit({
    windowMs:60 * 1000,
    max:5,
    message:{
        status:429,
        message:"Please Login after One Minute"
    },
    standardHeaders:true,
    legacyHeaders:false
})