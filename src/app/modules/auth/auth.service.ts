import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import prisma from "../../shared/prisma";
import sendEmail from "./sendEmail";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  console.log(userData)

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

  const userData = await prisma.user.findUnique({
    where: {
      email: decodedData?.email,
    },
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
  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const isPasswordMatched = payload.password === userData.password;

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }


  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: payload.password,
    },
  });

  return { message: "Password changed successfully!" };
};

const forgetPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
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
  const userData = await prisma.user.findUnique({
    where: {
      id: payload.email,
    },
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


  await prisma.user.update({
    where: {
      id: payload.email,
    },
    data: {
      password: payload.password
    },
  });
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
