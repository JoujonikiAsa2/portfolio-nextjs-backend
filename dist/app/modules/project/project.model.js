"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
// src/models/project.model.ts
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
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
exports.Project = (0, mongoose_1.model)('Project', projectSchema);
