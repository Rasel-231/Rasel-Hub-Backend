"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./app/Routes"));
const http_status_codes_1 = require("http-status-codes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express();
const port = 5001;
//middlewares
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use((0, cookie_parser_1.default)());
app.use(express.urlencoded({ extended: true }));
//route middlewares
app.use("/api/v1", Routes_1.default);
//not found url
app.use((req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errMessage: [
            {
                path: req.originalUrl,
                message: "Api not found",
            },
        ],
    });
});
exports.default = app;
