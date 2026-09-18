import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.services";
import config from "../../../config";



const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.node_env === "production",
  sameSite: (config.node_env === "production" ? "none" : "lax") as
    | "none"
    | "lax",
});


const authLogin = catchAsync(async (req: Request, res: Response) => {
  const loginUser = req.body;

  if (!loginUser || !loginUser.userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "userId missing in request body" });
  }


  const result = await authServices.authLogin(loginUser);
  const { token, refreshToken } = result;


  const cookieOptions = getCookieOptions();


  res.cookie("token", token, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15,
  });



  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 7,
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
  const cookieOptions = getCookieOptions();

  res.clearCookie("token", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);


  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged out successfully",
    data: { success: false, timestamp: new Date().toISOString() },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  console.log("===== REFRESH START =====", { cookies: req.cookies });
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    console.log("===== REFRESH FAILED: token missing =====");
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Refresh token missing" });
  }

  const result = await authServices.refreshToken(refreshToken);
  console.log("===== REFRESH SERVICE RESULT =====", {
    token: result.token ? "SET" : "EMPTY",
    refreshToken: result.refreshToken ? "SET" : "EMPTY",
  });

  const cookieOptions = getCookieOptions();


  res.cookie("token", result.token, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15,
  });
  console.log("===== REFRESH TOKEN COOKIE RESET =====");


  res.cookie("refreshToken", result.refreshToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  console.log("===== REFRESH TOKEN COOKIES RESET COMPLETE =====");

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});

// ================= VERIFY TOKEN =================

const verifyToken = catchAsync(async (req: Request, res: Response) => {

  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Token is missing" });
  }

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
