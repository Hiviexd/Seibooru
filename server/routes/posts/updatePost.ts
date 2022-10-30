import { Router, Request, Response } from "express";
import { posts, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import isAdmin from "../../middlewares/isAdmin";

export default async (req: Request, res: Response) => {
    const router = Router();
	const logger = new LoggerConsumer("updatePost", req);
	const id = req.params.id;
	const post = await posts.findById(id);
	const { title, tags } = req.body;

	if (!post) {
		return res.status(404).json({
			message: "Post not found",
		});
	}

	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!user) {
		return res.status(401).json({
			message: "Unauthorized",
		});
	}

	if (post.posterId !== user._id) {
        router.use(isAdmin);
    }

	logger.printInfo(`updating post by ${user.username}`);

    title ? post.title = title : null;
    tags ? post.tags = tags : null;

    const updatedPost = await posts.findOneAndUpdate(
        { _id: post._id },
        { title, tags },
        { new: true }
    );

	logger.printInfo(`post updated by ${user.username}`);

	return res.status(200).json({
        status: 200,
		message: "Post updated",
        post: updatedPost,
	});
};
