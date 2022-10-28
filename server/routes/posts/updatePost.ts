import { Request, Response } from "express";
import { posts, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
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
		return res.status(401).json({
			message: "Unauthorized",
		});
	}

	logger.printInfo(`updating post by ${user.username}`);

	await posts.updateOne(
		{ _id: id },
		{
			$set: {
				title,
				tags,
			},
		}
	);

	logger.printInfo(`post updated by ${user.username}`);

	return res.status(200).json({
		message: "Post updated",
	});
};
