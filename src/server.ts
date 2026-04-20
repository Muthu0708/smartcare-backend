import app from './app.js';
import dotenv from 'dotenv'
import { sequelize } from './config/db.js';
import { logger } from './config/logger.js';
dotenv.config();

const PORT=process.env.PORT || 5002;

const connectDB=async()=>{
    try{
     await sequelize.authenticate();
     logger.info("Database connected successfully");

     app.listen(PORT,()=>{
        logger.info(`Server running successfully on port ${PORT}`)
     });
    }
    catch(err:any){
        logger.error("Failed to start the server",err);
        process.exit(1);

    }
};
connectDB();