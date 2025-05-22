import express from "express";
import auth from "../../middlewares/auth";
import { BlogControllers } from "./blog.controller";
import { UploadToCloudinary } from "../../../helpers/CloudinaryUpload";
import { UploadImageInServer } from "../../middlewares/UploadImageInServer";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  BlogControllers.createBlog
);
router.get("/", BlogControllers.getAllBlogs);
router.get("/:id", BlogControllers.getSingleBlog);
router.patch(
  "/:id",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  BlogControllers.updateBlog
);
router.delete("/:id", auth("ADMIN"), BlogControllers.deleteBlog);

export const BlogRoutes = router;
