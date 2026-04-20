import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepo from "../repositeries/authRepo.js";
import type { LoginDTO, RegisterDTO } from "../types/LoginAndReg.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (data: RegisterDTO) => {
  const existing = await authRepo.findPatientByEmail(data.email);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await authRepo.createUser({
    ...data,
    password: hashedPassword,
    role: "Patient",
  });

  return user;
};

export const login = async (data: LoginDTO) => {
  let user: any = await authRepo.findPatientByEmail(data.email);
  let role = "Patient";

  if (!user) {
    user = await authRepo.findDoctorByEmail(data.email);
    role = "Doctor";
  }

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role,
  });

  let refreshToken: string | null = null;

  if (role === "Patient") {
    refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role,
    })

    await authRepo.updatePatientRefreshToken(user.id, refreshToken);
  }
  
  if (role === "Doctor") {
    refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role,
    })
  }

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role,
    },
  };
};

export const refreshAccessToken = async (token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  } catch (error) {
    throw new Error("Invalid token");
  }

  const user = await authRepo.findByPatientId(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.refreshToken !== token) {
    throw new Error("Refresh token mismatch");
  }

  const newAccessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: "Patient",
  });

  const newRefreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
    role: "Patient",
  });

  await authRepo.updatePatientRefreshToken(user.id, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logout = async (userId: number) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  await authRepo.removePatientRefreshToken(userId);

  return {
    message: "Logout successfully",
  };
};