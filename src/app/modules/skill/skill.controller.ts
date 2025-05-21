import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { SkillServices } from "./skill.service";
import { catchAsync } from "../../shared/catchAsync";

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.create(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skill created successfully!",
    data: result
  });
});

const getAllSkills = catchAsync(async (_req, res) => {
  const result = await SkillServices.getAll();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skills retrieved successfully!",
    data: result,
  });
});

const getSingleSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.getSingle(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skill retrieved successfully!",
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.update(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skill updated successfully!",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.deleteSkill(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Skill deleted successfully!",
    data: result,
  });
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};