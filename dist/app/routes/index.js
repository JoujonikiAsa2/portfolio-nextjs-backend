"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const project_route_1 = require("../modules/project/project.route");
const blog_route_1 = require("../modules/blog/blog.route");
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
    }
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
