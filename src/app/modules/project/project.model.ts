// src/models/project.model.ts
import mongoose, { Schema, model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>({
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  frontendLivelink: {
    type: String,
    trim: true,
  },
  backendLivelink: {
    type: String,
    trim: true,
  },
  githubFrontend: {
    type: String,
    trim: true,
  },
  githubBackend: {
    type: String,
    trim: true,
  },
  githubFullStack: {
    type: String,
    trim: true,
  },
  problemFaced: {
    type: String,
    trim: true,
  },
});

export const Project = model<TProject>('Project', projectSchema);
