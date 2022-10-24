import { Router } from "express";
import getUser from "./getUser";
import promoteUser from "./promoteUser";
import banUser from "./banUser";
import unbanUser from "./unbanUser";
import demoteUser from "./demoteUser";
import registerUser from "./registerUser";
import authenticateUser from "./authenticateUser";
//import editUser from "./editUser";
import { isLoggedIn, isOwner, isAdmin } from "../../middlewares";
import getUserAvatar from "./getUserAvatar";
import listPostsByUser from "./listPostsByUser";

const router = Router();

//? GET requests
router.get("/:id", getUser);
router.get("/:id/avatar", getUserAvatar);
router.get("/:id/posts", listPostsByUser);

//? POST requests
router.post("/register", registerUser);
router.post("/me", authenticateUser);
router.post("/:id/promote", isLoggedIn, isOwner, promoteUser);
router.post("/:id/demote", isLoggedIn, isOwner, demoteUser);
router.post("/:id/ban", isLoggedIn, isAdmin, banUser);
router.post("/:id/unban", isLoggedIn, isAdmin, unbanUser);

export const userRouter = router;
