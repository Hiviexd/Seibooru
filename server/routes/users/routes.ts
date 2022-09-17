import { Router } from "express";
import getUser from "./getUser";
import promoteUser from "./promoteUser";
import banUser from "./banUser";
import unbanUser from "./unbanUser";
import demoteUser from "./demoteUser";

const router = Router();

//? GET requests
router.get("/:id", getUser);

//? POST requests
router.get("/me", getUser);
router.post("/:id/promote", promoteUser);
router.post("/:id/ban", banUser);
router.post("/:id/unban", unbanUser);
router.post("/:id/demote", demoteUser);

export const userRouter = router;
