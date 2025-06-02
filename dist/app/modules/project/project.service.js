"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectServices = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const project_model_1 = require("./project.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.create(Object.assign({}, payload));
    return project;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_model_1.Project.find({});
    return projects;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.Project.findById(id);
    if (!project) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Project not found.");
    }
    return project;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProject = yield project_model_1.Project.findById(id);
    if (!existingProject) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Project not found.");
    }
    const updatedProject = yield project_model_1.Project.findByIdAndUpdate(id, payload, { new: true });
    console.log(updatedProject);
    return updatedProject;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProject = yield project_model_1.Project.findById(id);
    if (!existingProject) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Project not found.");
    }
    yield project_model_1.Project.findByIdAndDelete(id);
    return null;
});
exports.ProjectServices = {
    create,
    getAll,
    getSingle,
    update,
    deleteProject,
};
