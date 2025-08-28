"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const auth = () => {
    return async (req, res, next) => {
        try {
            let token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
            if (!token && req.cookies?.token) {
                token = req.cookies.token;
            }
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "Authorization token is missing" });
            }
            const verifiedUser = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
            req.user = verifiedUser;
            next();
        }
        catch (error) {
            console.error("Unauthorized user:", error);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};
exports.auth = auth;
