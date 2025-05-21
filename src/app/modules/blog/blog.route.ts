import express from "express";
import auth from "../../middlewares/auth";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.post("/", auth("ADMIN"),BlogControllers.createBlog);
router.get("/", BlogControllers.getAllBlogs);
router.get("/:id", BlogControllers.getSingleBlog);
router.patch("/:id", auth("ADMIN"), BlogControllers.updateBlog);
router.delete("/:id", auth("ADMIN"), BlogControllers.deleteBlog);

export const BlogRoutes = router;
