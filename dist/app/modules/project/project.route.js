"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("ADMIN"), project_controller_1.ProjectControllers.createProject);
router.get("/", project_controller_1.ProjectControllers.getAllProjects);
router.get("/:id", project_controller_1.ProjectControllers.getSingleProject);
router.patch("/:id", (0, auth_1.default)("ADMIN"), project_controller_1.ProjectControllers.updateProject);
router.delete("/:id", (0, auth_1.default)("ADMIN"), project_controller_1.ProjectControllers.deleteProject);
exports.ProjectRoutes = router;
