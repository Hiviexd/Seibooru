import { Request, Response } from "express";
import { followers, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("getUser", req);

	const author = await users.findOne({
		accountToken: req.headers.authorization || "",
	});

	if (!author) {
		logger.printError("Unauthorized!");

		return res.status(401).send({
			status: 401,
			message: "Unauthorized!",
		});
	}

	logger.printInfo(
		`${author.username} is trying to follow user ${req.params.id}`
	);

	const user = await users.findOne({ _id: req.params.id });

	if (!user) {
		logger.printError("User not found");
		return res.status(404).send({
			status: 404,
			message: "User not found",
		});
	}

	const currentFollower = await followers.findOne({
		userId: author._id,
		target: user._id,
	});

	if (!currentFollower) {
		logger.printError("Not found!");

		return res.status(404).send({
			status: 404,
			message: "Not found!",
		});
	}

	const followId = crypto.randomBytes(32).toString("hex").slice(32);

	await followers.findOneAndDelete({
		target: user._id,
		userId: author._id,
	});

	logger.printSuccess(
		`User ${author.safeUsername} (${req.params._id}) is following ${user.username}!`
	);

	const currentFollowersSize = await followers.count({ target: user._id });

	return res.status(200).send({
		status: 200,
		message: `You're unfollowing ${user._id} now!`,
		data: {
			size: currentFollowersSize,
			following: false,
		},
	});
};
