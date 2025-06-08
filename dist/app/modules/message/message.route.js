"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", message_controller_1.MessageControllers.sendMessage);
router.get("/", (0, auth_1.default)("ADMIN"), message_controller_1.MessageControllers.getMessage);
router.get("/:id", (0, auth_1.default)("ADMIN"), message_controller_1.MessageControllers.getMessageById);
exports.MessageRoutes = router;
