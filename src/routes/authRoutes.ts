import express from "express";
import * as authController from "../controller/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { loginRateLimiter } from "../middlewares/rateMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), loginRateLimiter, authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout",protect, authController.logout);
router.get("/me", protect, authController.getMe);

export default router;