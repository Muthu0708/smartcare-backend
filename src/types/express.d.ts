

declare global {
  namespace Express {
    interface Request {
      user?:{
        id:number,
        role:"Patient"|"Doctor"
      };
    }
  }
}

export {};