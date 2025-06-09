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
const http_status_1 = __importDefault(require("http-status"));
const blog_model_1 = require("./blog.model");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.create(Object.assign({}, payload));
    return blog;
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_model_1.Blog.find({}).sort({ createdAt: -1 });
    return blogs;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "blog not found.");
    }
    return blog;
});
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingblog = yield blog_model_1.Blog.findById(id);
    if (!existingblog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "blog not found.");
    }
    const updatedblog = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true });
    return updatedblog;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingblog = yield blog_model_1.Blog.findById(id);
    if (!existingblog) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "blog not found.");
    }
    yield blog_model_1.Blog.findByIdAndDelete(id);
    return null;
});
exports.BlogServices = {
    create,
    getAll,
    getSingle,
    update,
    deleteBlog,
};
