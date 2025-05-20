import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { AuthServices } from "./auth.service";
import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in successfully!",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in successfully!",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;
    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Password changed successfully!",
      data: result,
    });
  }
);

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password reset successfully!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization || "";
  await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password reset successfully!",
    data: null,
  });
});

export const UserControllers = {
  loginUser,
    refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};