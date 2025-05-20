import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { BlogServices } from "./blog.service";
import { catchAsync } from "../../shared/catchAsync";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.create(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog created successfully!",
    data: result
  });
});

const getAllBlogs = catchAsync(async (_req, res) => {
  const result = await BlogServices.getAll();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blogs retrieved successfully!",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingle(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog retrieved successfully!",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.update(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog updated successfully!",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlog(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog deleted successfully!",
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};