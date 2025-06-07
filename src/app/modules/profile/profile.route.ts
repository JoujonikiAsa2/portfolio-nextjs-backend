import express from "express";
import auth from "../../middlewares/auth";
import { ProfileControllers } from "./profile.controller";
import { UploadToCloudinary } from "../../../helpers/CloudinaryUpload";
import { UploadImageInServer } from "../../middlewares/UploadImageInServer";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  ProfileControllers.createProfile
);
router.get("/", ProfileControllers.getAllProfiles);
router.get("/:id", ProfileControllers.getSingleProfile);
router.patch(
  "/:id",
  auth("ADMIN"),
  UploadImageInServer.single("file"),
  UploadToCloudinary,
  ProfileControllers.updateProfile
);
router.delete("/:id", auth("ADMIN"), ProfileControllers.deleteProfile);
router.put("/:id", ProfileControllers.downloadResumeClickedCount);

export const ProfileRoutes = router;
