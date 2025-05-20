import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";
import status from "http-status";

type TLogin = {
  email: string;
  password: string;
};

const login = async (payload: TLogin) => {
  const { email, password } = payload;

  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log(isUserExists);

  if (!isUserExists) throw new ApiError(status.NOT_FOUND, "User Not Found.");

  const isPasswordValid = isUserExists?.password === password

  if (!isPasswordValid)
    throw new ApiError(status.UNAUTHORIZED, "Invalid Credentials.");
  return isUserExists;
};

export const UserServices = {
  login,
};
