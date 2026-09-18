"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const auth_services_1 = require("./auth.services");
const config_1 = __importDefault(require("../../../config"));
// Dev: localhost:3000 -> localhost:5001 are same-site, so Lax works without Secure.
// Prod: cross-site (vercel.app -> onrender.com) needs None + Secure.
const getCookieOptions = () => ({
    httpOnly: true,
    secure: config_1.default.node_env === "production",
    sameSite: (config_1.default.node_env === "production" ? "none" : "lax"),
});
// ================= LOGIN =================
const authLogin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== AUTH LOGIN START =====", req.body);
    const loginUser = req.body;
    if (!loginUser || !loginUser.userId) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "userId missing in request body" });
    }
    const result = await auth_services_1.authServices.authLogin(loginUser);
    console.log("===== LOGIN SERVICE RESULT =====", result);
    const { token, refreshToken } = result;
    const cookieOptions = getCookieOptions();
    res.cookie("token", token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
    });
    console.log("===== TOKEN COOKIE SET =====", { name: "token", maxAge: 1000 * 60 * 15 });
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    console.log("===== REFRESH TOKEN COOKIE SET =====", { name: "refreshToken", maxAge: 1000 * 60 * 60 * 24 * 7 });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});
// ================= LOGOUT =================
const logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== LOGOUT START =====", { cookies: req.cookies });
    const cookieOptions = getCookieOptions();
    res.clearCookie("token", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    console.log("===== LOGOUT COOKIES CLEARED =====");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User logged out successfully",
        data: { success: false, timestamp: new Date().toISOString() },
    });
});
const refreshToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== REFRESH START =====", { cookies: req.cookies });
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        console.log("===== REFRESH FAILED: token missing =====");
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Refresh token missing" });
    }
    const result = await auth_services_1.authServices.refreshToken(refreshToken);
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
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Access token refreshed successfully",
        data: result,
    });
});
// ================= VERIFY TOKEN =================
const verifyToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== VERIFY TOKEN START =====", { cookies: req.cookies });
    const token = req.cookies?.token;
    console.log("===== VERIFY TOKEN FROM COOKIE =====", token ? "TOKEN FOUND" : "TOKEN MISSING");
    if (!token) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Token is missing" });
    }
    const verifiedToken = await auth_services_1.authServices.verifyToken(token);
    console.log("===== VERIFY TOKEN SERVICE RESULT =====", verifiedToken);
    if (!verifiedToken) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Token is invalid" });
    }
    console.log("===== VERIFY TOKEN SUCCESS =====");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Token is valid",
        data: verifiedToken,
    });
});
exports.authController = {
    authLogin,
    logout,
    refreshToken,
    verifyToken,
};
