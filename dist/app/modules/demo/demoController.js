"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const demoservice_1 = require("./demoservice");
const demodata = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await demoservice_1.demoServices.demodata();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
exports.demoController = {
    demodata,
};
