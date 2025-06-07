"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const project_route_1 = require("../modules/project/project.route");
const blog_route_1 = require("../modules/blog/blog.route");
const skill_route_1 = require("../modules/skill/skill.route");
const profile_route_1 = require("../modules/profile/profile.route");
const message_route_1 = require("../modules/message/message.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/project",
        route: project_route_1.ProjectRoutes,
    },
    {
        path: "/blog",
        route: blog_route_1.BlogRoutes,
    },
    {
        path: "/profile",
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: "/skill",
        route: skill_route_1.SkillRoutes,
    },
    {
        path: "/message",
        route: message_route_1.MessageRoutes,
    }
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
