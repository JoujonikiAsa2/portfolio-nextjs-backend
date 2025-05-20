import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { ProjectServices } from "./project.service";
import { catchAsync } from "../../shared/catchAsync";

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.create(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project created successfully!",
    data: result
  });
});

const getAllProjects = catchAsync(async (_req, res) => {
  const result = await ProjectServices.getAll();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Projects retrieved successfully!",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.getSingle(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project retrieved successfully!",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.update(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project updated successfully!",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProject(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project deleted successfully!",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};