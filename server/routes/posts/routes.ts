import { Router } from "express";
import multer from "multer";
import { isLoggedIn } from "../../middlewares";
import createPost from "./createPost";
import getPost from "./getPost";
import getPostImage from "./getPostImage";
import listPosts from "./listPosts";

const router = Router();

//? GET requests
router.get("/listing", listPosts)
router.get("/:id", getPost)
router.get("/:id/image", getPostImage)

//? POST requests
router.post("/new", isLoggedIn, multer({storage: multer.memoryStorage()}).single("image"), createPost);

export const postRouter = router;
