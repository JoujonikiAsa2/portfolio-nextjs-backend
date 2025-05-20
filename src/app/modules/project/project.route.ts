import express from "express";
import auth from "../../middlewares/auth";
import { ProjectControllers } from "./project.controller";

const router = express.Router();

router.post("/", auth("ADMIN"), ProjectControllers.createProject);
router.get("/", ProjectControllers.getAllProjects);
router.get("/:id", ProjectControllers.getSingleProject);
router.patch("/:id", auth("ADMIN"), ProjectControllers.updateProject);
router.delete("/:id", auth("ADMIN"), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
