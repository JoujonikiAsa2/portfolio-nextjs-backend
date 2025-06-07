"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const profile_controller_1 = require("./profile.controller");
const CloudinaryUpload_1 = require("../../../helpers/CloudinaryUpload");
const UploadImageInServer_1 = require("../../middlewares/UploadImageInServer");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("ADMIN"), UploadImageInServer_1.UploadImageInServer.single("file"), CloudinaryUpload_1.UploadToCloudinary, profile_controller_1.ProfileControllers.createProfile);
router.get("/", profile_controller_1.ProfileControllers.getAllProfiles);
router.get("/:id", profile_controller_1.ProfileControllers.getSingleProfile);
router.patch("/:id", (0, auth_1.default)("ADMIN"), UploadImageInServer_1.UploadImageInServer.single("file"), CloudinaryUpload_1.UploadToCloudinary, profile_controller_1.ProfileControllers.updateProfile);
router.delete("/:id", (0, auth_1.default)("ADMIN"), profile_controller_1.ProfileControllers.deleteProfile);
router.put("/:id", profile_controller_1.ProfileControllers.downloadResumeClickedCount);
exports.ProfileRoutes = router;
