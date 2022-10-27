import { Router } from "express";
import multer from "multer";
import getUser from "./getUser";
import promoteUser from "./promoteUser";
import banUser from "./banUser";
import unbanUser from "./unbanUser";
import demoteUser from "./demoteUser";
import registerUser from "./registerUser";
import authenticateUser from "./authenticateUser";
import updateUser from "./updateUser";
import { isLoggedIn, isOwner, isAdmin } from "../../middlewares";
import getUserAvatar from "./getUserAvatar";
import listPostsByUser from "./listPostsByUser";
import followUser from "./followUser";
import unfollowUser from "./unfollowUser";
import getUserFollowers from "./getUserFollowers";

const router = Router();

//? GET requests
router.get("/:id", getUser);
router.get("/:id/avatar", getUserAvatar);
router.get("/:id/posts", listPostsByUser);
router.get("/:id/followers", getUserFollowers);

//? POST requests
router.post("/register", registerUser);
router.post("/:id/followers", isLoggedIn, followUser);
router.post("/me", authenticateUser);
router.post("/:id/promote", isLoggedIn, isOwner, promoteUser);
router.post("/:id/demote", isLoggedIn, isOwner, demoteUser);
router.post("/:id/ban", isLoggedIn, isAdmin, banUser);
router.post("/:id/unban", isLoggedIn, isAdmin, unbanUser);
router.post("/update", isLoggedIn, multer({ storage: multer.memoryStorage() }).single("image"), updateUser);

//? DELETE requests
router.delete("/:id/followers", isLoggedIn, unfollowUser);

export const userRouter = router;
