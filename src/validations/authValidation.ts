import {z}  from 'zod';

export const registerSchema=z.object({
   name:z.string().min(3,"Name must be more than 3 characters"),
   email:z.string().email("Invalid email"),
   password:z.string().min(6,"Password must be atleast 6 characters"),
   role:z.enum(["Patient","Doctor"]).optional()
});


export const loginSchema=z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password atleast 6 characters")
})