import express from "express";
import { UserControllers } from "./auth.controller";
import { User } from "./auth.model";

const router = express.Router();

router.post("/", UserControllers.loginUser);

export const AuthRoutes = router;
