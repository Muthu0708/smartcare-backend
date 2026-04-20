import * as authService from "../services/authServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";

export const register = asyncHandler(async (req, res) => {
  await authService.register(req.body);

  return res.status(201).json({
    message: "User Registered Successfully",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.login(req.body);

  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
  };

  const response = res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  if (refreshToken) {
    response.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  return response.json({
    message: "Login successful",
    accessToken,
    refreshToken,
    user,
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No Refresh Token" });
  }

  const { accessToken, refreshToken } =
    await authService.refreshAccessToken(token);

  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
  };

  return res
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "Token refreshed",
      accessToken,
    });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      await authService.logout(decoded.id);
    } catch (err) {
      console.log("Invalid refresh token, skipping DB cleanup");
    }
  }

  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
  };

  return res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({ message: "Logged out successfully" });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    id: req.user!.id,
    role: req.user!.role,
  });
});