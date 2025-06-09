import ApiError from "../../errors/ApiError";
import status from "http-status";
import { TBlog } from "./blog.interface";
import { User } from "../auth/auth.model";
import { Blog } from "./blog.model";

const create = async (payload: TBlog) => {
  const blog = await Blog.create({...payload});
  return blog;
};

const getAll = async () => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  return blogs;
};

const getSingle = async (id: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ApiError(status.NOT_FOUND, "blog not found.");
  }

  return blog;
};

const update = async (id: string, payload: Partial<TBlog>) => {
  const existingblog = await Blog.findById(id);

  if (!existingblog) {
    throw new ApiError(status.NOT_FOUND, "blog not found.");
  }

  const updatedblog = await Blog.findByIdAndUpdate(id, payload, {new: true});

  return updatedblog;
};

const deleteBlog = async (id: string) => {
  const existingblog = await Blog.findById(id);

  if (!existingblog) {
    throw new ApiError(status.NOT_FOUND, "blog not found.");
  }

  await Blog.findByIdAndDelete(id);

  return null;
};

export const BlogServices = {
  create,
  getAll,
  getSingle,
  update,
  deleteBlog,
};
