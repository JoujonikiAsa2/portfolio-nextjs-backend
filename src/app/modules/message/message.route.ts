import express from "express";
import { MessageControllers } from "./message.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  MessageControllers.sendMessage
);
router.get(
  "/",
    auth("ADMIN"),
  MessageControllers.getMessage
);
router.get(
  "/:id",
    auth("ADMIN"),
  MessageControllers.getMessageById
);
export const MessageRoutes = router;
