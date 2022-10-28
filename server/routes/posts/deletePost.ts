import { Request, Response } from "express";
import { posts, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("deletePost", req);
	const id = req.params.id;
	const post = await posts.findById(id);

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
		return res.status(401).json({
			message: "Unauthorized",
		});
	}

	logger.printInfo("Deleting post");

	await posts.deleteOne({
		_id: id,
	});

	logger.printSuccess("Post deleted");

	return res.status(200).json({
		message: "Post deleted",
	});
};
