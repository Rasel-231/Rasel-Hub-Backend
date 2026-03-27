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
// ================= LOGIN =================
const authLogin = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const loginUser = req.body;
    if (!loginUser || !loginUser.userId) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "userId missing in request body" });
    }
    const result = await auth_services_1.authServices.authLogin(loginUser);
    const { token, refreshToken } = result;
    const cookieOptions = {
        httpOnly: true,
        secure: config_1.default.node_env === "production",
        sameSite: "none",
    };
    res.cookie("token", token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
    });
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});
// ================= LOGOUT =================
const logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: config_1.default.node_env === "production",
        sameSite: "none",
    };
    res.clearCookie("token", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User logged out successfully",
        data: { success: false, timestamp: new Date().toISOString() },
    });
});
const refreshToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Refresh token missing" });
    }
    const result = await auth_services_1.authServices.refreshToken(refreshToken);
    const cookieOptions = {
        httpOnly: true,
        secure: config_1.default.node_env === "production",
        sameSite: "none",
    };
    res.cookie("token", result.token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
    });
    res.cookie("refreshToken", result.refreshToken, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Access token refreshed successfully",
        data: result,
    });
});
// ================= VERIFY TOKEN =================
const verifyToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { token } = req.cookies;
    console.log("Controller verify Token", token);
    if (!token) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Token is missing" });
    }
    const verifiedToken = await auth_services_1.authServices.verifyToken(token);
    if (!verifiedToken) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Token is invalid" });
    }
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
