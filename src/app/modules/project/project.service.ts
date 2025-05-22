import ApiError from "../../errors/ApiError";
import status from "http-status";
import { TProject } from "./project.interface";
import { Project } from "./project.model";

const create = async (payload: TProject) => {
  const project = await Project.create({
    ...payload, 
  });
  return project;
};

const getAll = async () => {
  const projects = await Project.find({});
  return projects;
};

const getSingle = async (id: string) => {
  const project = await Project.findById(id );

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found.");
  }

  return project;
};

const update = async (id: string, payload: Partial<TProject>) => {
  const existingProject = await Project.findById(id);

  if (!existingProject) {
    throw new ApiError(status.NOT_FOUND, "Project not found.");
  }

  const updatedProject = await Project.findByIdAndUpdate(id, payload, {new: true});

  return updatedProject;
};

const deleteProject = async (id: string) => {
  const existingProject = await Project.findById(id);

  if (!existingProject) {
    throw new ApiError(status.NOT_FOUND, "Project not found.");
  }

  await Project.findByIdAndDelete(id);

  return null;
};

export const ProjectServices = {
  create,
  getAll,
  getSingle,
  update,
  deleteProject,
};
