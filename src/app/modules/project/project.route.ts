import express from "express";
import auth from "../../middlewares/auth";
import { ProjectControllers } from "./project.controller";
import { UploadImageInServer } from "../../middlewares/UploadImageInServer";
import { UploadToCloudinary } from "../../../helpers/CloudinaryUpload";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  ProjectControllers.createProject
);
router.get("/", ProjectControllers.getAllProjects);
router.get("/:id", ProjectControllers.getSingleProject);
router.patch(
  "/:id",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  ProjectControllers.updateProject
);
router.delete("/:id", auth("ADMIN"), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
