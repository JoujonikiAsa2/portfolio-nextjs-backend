import express from "express";
import auth from "../../middlewares/auth";
import { ProfileControllers } from "./profile.controller";

const router = express.Router();

router.post("/", auth("ADMIN"),ProfileControllers.createProfile);
router.get("/", ProfileControllers.getAllProfiles);
router.get("/:id", ProfileControllers.getSingleProfile);
router.patch("/:id", auth("ADMIN"), ProfileControllers.updateProfile);
router.delete("/:id", auth("ADMIN"), ProfileControllers.deleteProfile);

export const ProfileRoutes = router;
