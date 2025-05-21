import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import sendEmail from "./sendEmail";
import mongoose from "mongoose";
import { User } from "./auth.model";


const loginUser = async (payload: { email: string; password: string }) => {
  console.log(User.db.collections)
  const userData = await User.findOne({
    email: payload.email,
  });

  console.log(userData);

  if (userData === null) {
    throw new Error("No user found");
  }

  const isPasswordMatched = payload.password === userData.password;

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token, "047dsfcdghfdkgj");
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await User.findOne({
    email: decodedData.email,
  });

  if (userData === null) {
    throw new Error("No user found");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  return {
    accessToken,
  };
};

const changePassword = async (user: any, payload: any) => {
  console.log(user);
  const userData = await User.findOne({
    email: user.email,
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const isPasswordMatched = payload.password === userData.password;

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  await User.findOneAndUpdate(
    { email: payload.email },
    { password: payload.password },
    { new: true }
  );

  return { message: "Password changed successfully!" };
};

const forgetPassword = async (payload: { email: string }) => {
  const userData = await User.findOne({
    email: payload.email,
  });

  const resetPasswordToken = await jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    config.jwt.reset_token_secret as Secret,
    config.jwt.reset_token_expires_in as string
  );

  const resetPasswordLink = `${config.reset_password_url}?id=${userData?.id}&token=${resetPasswordToken}`;
  console.log(resetPasswordLink);

  await sendEmail(
    userData?.email as string,
    `
    <div>
    <p>Dear,</p>
      <p>Your reset password Link
      <a href="${resetPasswordLink}">
      <button>Reset Password</button></a>
      </p>
    </div>
    ` as string
  );

  return { message: "Reset password link send to email" };
};

const resetPassword = async (
  token: string,
  payload: { email: string; password: string }
) => {
  const userData = await User.findOne({
    email: payload.email,
  });

  if (userData === null) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid User");
  }

  const isValidToken = await jwtHelpers.verifyToken(
    token,
    config.jwt.reset_token_secret as Secret
  );
  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid token");
  }

  const isPasswordMatched = payload.password === userData.password;

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  await User.findOneAndUpdate(
    { email: payload.email },
    { password: payload.password },
    { new: true }
  );
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
