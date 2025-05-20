import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";
import status from "http-status";
import { TBlog } from "./blog.interface";
import { Prisma } from "../../../../generated/prisma";

const create = async (payload: Omit<TBlog, 'Comment' | 'Reply'>) => {
  const blog = await prisma.blog.create({
    data: payload,
  });
  return blog;
};


const getAll= async () => {
  const blogs = await prisma.blog.findMany();
  return blogs;
};

const getSingle= async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    throw new ApiError(status.NOT_FOUND, "blog not found.");
  }

  return blog;
};


const update = async (id: string, payload: Prisma.BlogUncheckedUpdateInput) => {
  const existingblog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!existingblog) {
    throw new ApiError(status.NOT_FOUND, "blog not found.");
  }

  const updatedblog = await prisma.blog.update({
    where: { id },
    data: payload,
  });

  return updatedblog;
};


const deleteBlog = async (id: string) => {
  const existingblog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!existingblog) {
    throw new ApiError(status.NOT_FOUND, "blog not found.");
  }

  await prisma.blog.delete({
    where: { id },
  });

  return null;
};

export const BlogServices = {
  create,
  getAll,
  getSingle,
  update,
  deleteBlog
};
