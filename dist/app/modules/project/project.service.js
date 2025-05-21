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
const prisma_1 = __importDefault(require("../../shared/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const project = yield prisma_1.default.projects.create({
        data: payload,
    });
    return project;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield prisma_1.default.projects.findMany();
    return projects;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield prisma_1.default.projects.findUnique({
        where: { id },
    });
    if (!project) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Project not found.");
    }
    return project;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProject = yield prisma_1.default.projects.findUnique({
        where: { id },
    });
    if (!existingProject) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Project not found.");
    }
    const updatedProject = yield prisma_1.default.projects.update({
        where: { id },
        data: payload,
    });
    return updatedProject;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProject = yield prisma_1.default.projects.findUnique({
        where: { id },
    });
    if (!existingProject) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Project not found.");
    }
    yield prisma_1.default.projects.delete({
        where: { id },
    });
    return null;
});
exports.ProjectServices = {
    create,
    getAll,
    getSingle,
    update,
    deleteProject
};
