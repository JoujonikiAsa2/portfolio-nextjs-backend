import express from "express";
import auth from "../../middlewares/auth";
import { SkillControllers } from "./skill.controller";

const router = express.Router();

router.post("/", auth("ADMIN"), SkillControllers.createSkill);
router.get("/", SkillControllers.getAllSkills);
router.get("/:id", SkillControllers.getSingleSkill);
router.patch("/:id", auth("ADMIN"), SkillControllers.updateSkill);
router.delete("/:id", auth("ADMIN"), SkillControllers.deleteSkill);

export const SkillRoutes = router;
