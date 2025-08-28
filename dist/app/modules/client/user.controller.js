"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const user_services_1 = require("./user.services");
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { ...userData } = req.body;
    const result = await user_services_1.UserNameServices.createUser(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User created Successfully",
        data: result,
    });
});
const getAllUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_services_1.UserNameServices.getAllUser();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await user_services_1.UserNameServices.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await user_services_1.UserNameServices.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await user_services_1.UserNameServices.updateUser(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
exports.UserNameController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
