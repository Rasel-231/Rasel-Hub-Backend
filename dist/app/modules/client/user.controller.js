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
    console.log("===== CREATE USER START =====", req.body);
    const { ...userData } = req.body;
    const result = await user_services_1.UserNameServices.createUser(userData);
    console.log("===== CREATE USER RESULT =====", result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User created Successfully",
        data: result,
    });
});
const getAllUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== GET ALL USERS START =====", { cookies: req.cookies });
    const result = await user_services_1.UserNameServices.getAllUser();
    console.log("===== GET ALL USERS RESULT (count) =====", Array.isArray(result) ? result.length : result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== GET SINGLE USER START =====", { id: req.params.id });
    const id = req.params.id;
    const result = await user_services_1.UserNameServices.getSingleUser(id);
    console.log("===== GET SINGLE USER RESULT =====", result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== DELETE USER START =====", { id: req.params.id });
    const id = req.params.id;
    const result = await user_services_1.UserNameServices.deleteUser(id);
    console.log("===== DELETE USER RESULT =====", result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Find Successfully",
        data: result,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log("===== UPDATE USER START =====", { id: req.params.id, data: req.body });
    const id = req.params.id;
    const updateData = req.body;
    const result = await user_services_1.UserNameServices.updateUser(id, updateData);
    console.log("===== UPDATE USER RESULT =====", result);
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
