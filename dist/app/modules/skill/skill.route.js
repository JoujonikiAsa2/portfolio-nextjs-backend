"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const skill_controller_1 = require("./skill.controller");
const CloudinaryUpload_1 = require("../../../helpers/CloudinaryUpload");
const UploadImageInServer_1 = require("../../middlewares/UploadImageInServer");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("ADMIN"), UploadImageInServer_1.UploadImageInServer.single("file"), CloudinaryUpload_1.UploadToCloudinary, skill_controller_1.SkillControllers.createSkill);
router.get("/", skill_controller_1.SkillControllers.getAllSkills);
router.get("/:id", skill_controller_1.SkillControllers.getSingleSkill);
router.patch("/:id", (0, auth_1.default)("ADMIN"), UploadImageInServer_1.UploadImageInServer.single("file"), CloudinaryUpload_1.UploadToCloudinary, skill_controller_1.SkillControllers.updateSkill);
router.delete("/:id", (0, auth_1.default)("ADMIN"), skill_controller_1.SkillControllers.deleteSkill);
exports.SkillRoutes = router;
