"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blog_controller_1 = require("./blog.controller");
const CloudinaryUpload_1 = require("../../../helpers/CloudinaryUpload");
const UploadImageInServer_1 = require("../../middlewares/UploadImageInServer");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("ADMIN"), UploadImageInServer_1.UploadImageInServer.single("file"), CloudinaryUpload_1.UploadToCloudinary, blog_controller_1.BlogControllers.createBlog);
router.get("/", blog_controller_1.BlogControllers.getAllBlogs);
router.get("/:id", blog_controller_1.BlogControllers.getSingleBlog);
router.patch("/:id", (0, auth_1.default)("ADMIN"), UploadImageInServer_1.UploadImageInServer.single("file"), CloudinaryUpload_1.UploadToCloudinary, blog_controller_1.BlogControllers.updateBlog);
router.delete("/:id", (0, auth_1.default)("ADMIN"), blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRoutes = router;
