import { Router } from "express";
import multer from "multer";
import { isLoggedIn } from "../../middlewares";
import createPost from "./createPost";
import getPost from "./getPost";
import getPostImage from "./getPostImage";
import getTrending from "./getTrending";
import likePost from "./likePost";
import likePostRemove from "./likePostRemove";
import listPosts from "./listPosts";

const router = Router();

//? GET requests
router.get("/listing", listPosts);
router.get("/trending", getTrending);
router.get("/:id", getPost);
router.get("/:id/image", getPostImage);

//? POST requests
router.post(
	"/new",
	isLoggedIn,
	multer({ storage: multer.memoryStorage() }).single("image"),
	createPost
);
router.post("/:id/like", isLoggedIn, likePost);

// ? DELETE requests
router.delete("/:id/like", isLoggedIn, likePostRemove);

export const postRouter = router;
