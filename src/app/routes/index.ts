import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { SkillRoutes } from "../modules/skill/skill.route";
import { ProfileRoutes } from "../modules/profile/profile.route";
import { MessageRoutes } from "../modules/message/message.route";

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
  },
  {
    path: "/profile",
    route: ProfileRoutes,
  },
  {
    path: "/skill",
    route: SkillRoutes,
  },
  {
    path: "/message",
    route: MessageRoutes,
  }
];

moduleRoutes.forEach(({path, route}) => router.use(path, route));

export default router;
