import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import { StatusCodes } from "http-status-codes";
import { demoServices } from "./demoservice";

const demodata = catchAsync(async (req: Request, res: Response) => {
  const result = await demoServices.demodata();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Find Successfully",
    data: result,
  });
});

export const demoController = {
  demodata,
};
