"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const auth_model_1 = __importDefault(require("./auth.model"));
// Access Token তৈরি
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.default.access_token, {
        expiresIn: "10m",
    });
};
// Refresh Token তৈরি
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.default.refresh_token, {
        expiresIn: "7d",
    });
};
// Login Service (password ছাড়া)
const authLogin = async (payload) => {
    const { userId } = payload;
    const user = await auth_model_1.default.findOne({ userId });
    if (!user) {
        throw new Error("UserID not found");
    }
    // Token generate
    const accessToken = generateAccessToken(user.userId);
    const refreshToken = generateRefreshToken(user.userId);
    return {
        userId: user.userId,
        token: accessToken,
        refreshToken,
        message: "User Login Successful",
    };
};
// Refresh Token Service
const refreshToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.refresh_token);
        const user = await auth_model_1.default.findOne({ userId: decoded.userId });
        if (!user) {
            throw new Error("UserID not found");
        }
        // Generate new tokens
        const newAccessToken = generateAccessToken(user.userId);
        const newRefreshToken = generateRefreshToken(user.userId);
        return {
            userId: user.userId,
            token: newAccessToken,
            refreshToken: newRefreshToken,
            message: "Access token refreshed successfully",
        };
    }
    catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
};
//verify token
const verifyToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
        return { userId: decoded.userId };
    }
    catch (error) {
        console.log(error);
    }
};
exports.authServices = {
    authLogin,
    refreshToken,
    verifyToken,
};
