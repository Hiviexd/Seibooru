import { Router } from "express";
import { userRouter } from "./users/routes";

const router = Router();

router.use("/users", userRouter)
// router.use("/posts", postRouter)

export const routes = router;
