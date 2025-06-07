import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { ProfileServices } from "./profile.service";
import { catchAsync } from "../../shared/catchAsync";

const createProfile = catchAsync(async (req, res) => {
  const result = await ProfileServices.create(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profile created successfully!",
    data: result
  });
});

const getAllProfiles = catchAsync(async (_req, res) => {
  const result = await ProfileServices.getAll();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profiles retrieved successfully!",
    data: result,
  });
});

const getSingleProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProfileServices.getSingle(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profile retrieved successfully!",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProfileServices.update(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profile updated successfully!",
    data: result,
  });
});

const deleteProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProfileServices.deleteprofile(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Profile deleted successfully!",
    data: result,
  });
});

const downloadResumeClickedCount = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProfileServices.downloadResumeClickedCount(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Resume download count successfully!",
    data: result,
  });
});

export const ProfileControllers = {
  createProfile,
  getAllProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
  downloadResumeClickedCount
};