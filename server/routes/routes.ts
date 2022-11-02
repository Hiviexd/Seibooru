import { Router } from "express";
import { userRouter } from "./users/routes";
import { postRouter } from "./posts/routes";
import { notificationsRouter } from "./notifications/routes";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/notifications", notificationsRouter);

export const routes = router;
