import express from "express";
import { UserControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/",
  UserControllers.loginUser
);

export const AuthRoutes = router;
