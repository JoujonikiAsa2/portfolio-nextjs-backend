"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
// src/models/project.model.ts
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
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
exports.Project = (0, mongoose_1.model)("Project", projectSchema);
