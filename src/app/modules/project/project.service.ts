import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";
import status from "http-status";
import { TProject } from "./project.interface";



const create = async (payload: TProject) => {
  console.log(payload)
  const project = await prisma.projects.create({
    data: payload,
  });
  return project;
};

const getAll= async () => {
  const projects = await prisma.projects.findMany();
  return projects;
};

const getSingle= async (id: string) => {
  const project = await prisma.projects.findUnique({
    where: { id },
  });

  if (!project) {
    throw new ApiError(status.NOT_FOUND, "Project not found.");
  }

  return project;
};

const update= async (id: string, payload: Partial<TProject>) => {
  const existingProject = await prisma.projects.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new ApiError(status.NOT_FOUND, "Project not found.");
  }

  const updatedProject = await prisma.projects.update({
    where: { id },
    data: payload,
  });

  return updatedProject;
};

const deleteProject = async (id: string) => {
  const existingProject = await prisma.projects.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new ApiError(status.NOT_FOUND, "Project not found.");
  }

  await prisma.projects.delete({
    where: { id },
  });

  return null;
};

export const ProjectServices = {
  create,
  getAll,
  getSingle,
  update,
  deleteProject
};
