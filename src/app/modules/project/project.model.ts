// src/models/project.model.ts
import mongoose, { Schema, model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>({
  title: {
    type: String,
  },
  duration: { type: String },
  team: { type: String },
  category: { type: String },
  status: { type: String },
  features: { type: [String] },
  challenges: { type: [String] },
  gallery: { type: [String] },
  thumbnail: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  techStack: {
    type: [String],
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
});

export const Project = model<TProject>("Project", projectSchema);
