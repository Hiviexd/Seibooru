import { Request, Response } from "express";
import { posts, users } from "../../../database";

export default async (req: Request, res: Response) => {
	const id = req.params.id;
	const post = await posts.findById(id);

	if (!post)
		return res.status(404).send({
			status: 404,
			message: "Post not found!",
		});

	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "User not found!",
		});

	if (!user.permissions.includes("post:like"))
		return res.status(403).send({
			status: 403,
			message: "No permissions.",
		});

	post.likes.push(user._id);
	await posts.findByIdAndUpdate(post._id, post);

	return res.status(200).send(post);
};
