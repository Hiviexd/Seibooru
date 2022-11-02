import { Router } from "express";
import clearNotifications from "./clearNotifications";
import deleteNotification from "./deleteNotification";
import getNotification from "./getNotification";

const router = Router();

router.get("/", getNotification);
router.post("/:id/delete", deleteNotification);
router.post("/clear", clearNotifications);

export const notificationsRouter = router;
