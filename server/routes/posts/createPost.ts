import { Request, Response } from "express";
import { posts, users } from "../../../database";
import crypto from "crypto";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { createWriteStream } from "fs";
import path from "path";
import { updateTrendingTag } from "../../trending/updateTendingTag";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("createPost", req);

	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "User not found!",
		});

	if (!user.permissions.includes("post:create"))
		return res.status(403).send({
			status: 403,
			message: "No permissions.",
		});

	logger.printInfo("Creating a new post...");

	const allowedMimeTypes = ["image/png", "image/jpeg", "image/gif"];

	if (!req.file || !allowedMimeTypes.includes(req.file.mimetype))
		return res.status(400).send({
			status: 400,
			message: "Invalid image!",
		});

	const postId = crypto.randomBytes(20).toString("hex").slice(20);

	const tags = sanitizeTags();

	if (!tags || tags.length < 1)
		return res.status(400).send({
			status: 400,
			message: "Provide valid tags",
		});

	const postInfo = {
		_id: postId,
		filename: `${postId}.${req.file.originalname}`,
		title: sanitizeTitle(),
		encoding: req.file.encoding,
		posterId: user._id,
		tags,
		createdAt: new Date(),
		posterUsername: user.username,
	};

	const post = new posts(postInfo);

	await post.save();

	createWriteStream(
		path.resolve(`./uploads/`).concat(`/images/${postInfo.filename}`)
	).write(new Uint8Array(req.file.buffer));

	function sanitizeTags() {
		try {
			const tags = req.body.tags;

			if (!tags) return [];
			if (typeof tags != "string") return [];

			const _tags = JSON.parse(tags);

			const sanitized: string[] = [];

			for (let tag of _tags) {
				tag = tag.toString().trim().toLowerCase().replace(/ /g, "_");

				if (typeof tag == "string" && tag != "" && tag.length < 150) {
					sanitized.push(tag);
				}
			}

			return sanitized;
		} catch (e) {
			console.error(e);

			return [];
		}
	}

	function sanitizeTitle() {
		const title = req.body.title;

		if (!title || typeof title != "string") return req.file?.originalname;

		if (title.trim() == "") return req.file?.originalname;

		return title.trim();
	}

	res.status(200).send({
		status: 200,
		message: "Image posted!",
		data: postInfo,
	});
};
