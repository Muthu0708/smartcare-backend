import "./models/index.js";
import express from "express";
import helmet from "helmet";
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { logger } from "./config/logger.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, "../uploads");

const app=express();
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        process.env.FRONTEND_URL || '',  // your main vercel URL
      ];

      // Allow all vercel preview deployments automatically
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(helmet({
  crossOriginResourcePolicy:{policy:"cross-origin"}
}));
app.use(express.json());

//logging
app.use(morgan(":method :url :status :response-time ms",{
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
}));
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: `
      .models { display: none !important; }
    `},));

app.use(cookieParser());
app.use("/uploads", express.static(uploadsPath));


//routes

app.use('/api/auth',authRoutes);
app.use('/api/appointments',appointmentRoutes);

//Global error handling

app.use(errorHandler);

app.use((req,res)=>{
    return res.status(404).json({
        message:"Route not found"
    })
})

export default app;