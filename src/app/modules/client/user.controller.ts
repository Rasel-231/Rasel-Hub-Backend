import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserNameServices } from "./user.services";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserNameServices.createUser(userData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User created Successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserNameServices.getAllUser();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserNameServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserNameServices.deleteUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await UserNameServices.updateUser(id, updateData);
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
