import { Request, Response } from "express";
import { posts, users } from "../../../database";
import { updateTrendingTag } from "../../trending/updateTendingTag";

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

	post.likes = post.likes.filter((l) => l != user._id);

	await posts.findByIdAndUpdate(post._id, post);

	post.tags.forEach((t) => updateTrendingTag(t, false));

	return res.status(200).send({
		status: 200,
		data: post,
	});
};
