import express from "express";
import auth from "../../middlewares/auth";
import { SkillControllers } from "./skill.controller";
import { UploadToCloudinary } from "../../../helpers/CloudinaryUpload";
import { UploadImageInServer } from "../../middlewares/UploadImageInServer";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  SkillControllers.createSkill
);
router.get("/", SkillControllers.getAllSkills);
router.get("/:id", SkillControllers.getSingleSkill);
router.patch(
  "/:id",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  SkillControllers.updateSkill
);
router.delete("/:id", auth("ADMIN"), SkillControllers.deleteSkill);

export const SkillRoutes = router;
