import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { BlogRoutes } from "../modules/blog/blog.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  }
];

moduleRoutes.forEach(({path, route}) => router.use(path, route));

export default router;
