import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserNameServices } from "./user.services";

const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log("===== CREATE USER START =====", req.body);
  const { ...userData } = req.body;
  const result = await UserNameServices.createUser(userData);
  console.log("===== CREATE USER RESULT =====", result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User created Successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  console.log("===== GET ALL USERS START =====", { cookies: req.cookies });
  const result = await UserNameServices.getAllUser();
  console.log("===== GET ALL USERS RESULT (count) =====", Array.isArray(result) ? result.length : result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  console.log("===== GET SINGLE USER START =====", { id: req.params.id });
  const id = req.params.id;
  const result = await UserNameServices.getSingleUser(id as string);
  console.log("===== GET SINGLE USER RESULT =====", result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  console.log("===== DELETE USER START =====", { id: req.params.id });
  const id = req.params.id;
  const result = await UserNameServices.deleteUser(id as string);
  console.log("===== DELETE USER RESULT =====", result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  console.log("===== UPDATE USER START =====", { id: req.params.id, data: req.body });
  const id = req.params.id;
  const updateData = req.body;
  const result = await UserNameServices.updateUser(id as string, updateData);
  console.log("===== UPDATE USER RESULT =====", result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});

export const UserNameController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
