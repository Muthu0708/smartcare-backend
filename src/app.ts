import "./models/index.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { swaggerSpec } from "./config/swagger.js";
import { logger } from "./config/logger.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uploads folder in project root
const uploadsPath = path.join(process.cwd(), "uploads");

// create uploads folder if not exists
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.FRONTEND_URL || "",
      ];

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

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  morgan(":method :url :status :response-time ms", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: `
      .models { display: none !important; }
    `,
  })
);

// static uploads
app.use("/uploads", express.static(uploadsPath));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// error handler
app.use(errorHandler);

app.use((req, res) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

export default app;