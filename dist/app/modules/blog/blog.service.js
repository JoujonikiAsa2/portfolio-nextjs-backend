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
exports.BlogServices = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_1.default.blog.create({
        data: payload,
    });
    return blog;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield prisma_1.default.blog.findMany();
    return blogs;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma_1.default.blog.findUnique({
        where: { id },
    });
    if (!blog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "blog not found.");
    }
    return blog;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingblog = yield prisma_1.default.blog.findUnique({
        where: { id },
    });
    if (!existingblog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "blog not found.");
    }
    const updatedblog = yield prisma_1.default.blog.update({
        where: { id },
        data: payload,
    });
    return updatedblog;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingblog = yield prisma_1.default.blog.findUnique({
        where: { id },
    });
    if (!existingblog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "blog not found.");
    }
    yield prisma_1.default.blog.delete({
        where: { id },
    });
    return null;
});
exports.BlogServices = {
    create,
    getAll,
    getSingle,
    update,
    deleteBlog
};
