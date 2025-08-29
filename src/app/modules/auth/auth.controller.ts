import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.services";
import config from "../../../config";

// ================= LOGIN =================
const authLogin = catchAsync(async (req: Request, res: Response) => {
  const loginUser = req.body;

  if (!loginUser || !loginUser.userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "userId missing in request body" });
  }

  // Login service call
  const result = await authServices.authLogin(loginUser);
  const { token, refreshToken } = result;

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "none" as const,
  };

  // Set access token cookie (short-lived)
  res.cookie("token", token, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15, // 15 minutes
  });

  // Set refresh token cookie (long-lived)
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

// ================= LOGOUT =================
const logout = catchAsync(async (req: Request, res: Response) => {
  // Clear cookies
  const cookieOptions = {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "none" as const,
  };

  res.clearCookie("token", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged out successfully",
    data: { success: false, timestamp: new Date().toISOString() },
  });
});

// ================= REFRESH TOKEN =================
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Refresh token missing" });
  }

  // Refresh token service call
  const result = await authServices.refreshToken(refreshToken);

  const cookieOptions = {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "none" as const,
  };

  // Set new access token cookie
  res.cookie("token", result.token, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15, // 15 minutes
  });

  // Reset refresh token cookie if new one is issued
  res.cookie("refreshToken", result.refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});

// ================= VERIFY TOKEN =================

const verifyToken = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Token is missing" });
  }
  //verify token
  const verifiedToken = await authServices.verifyToken(token);
  if (!verifiedToken) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Token is invalid" });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Token is valid",
    data: verifiedToken,
  });
});

export const authController = {
  authLogin,
  logout,
  refreshToken,
  verifyToken,
};
