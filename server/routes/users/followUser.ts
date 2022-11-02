import { Request, Response } from "express";
import { followers, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import crypto from "crypto";
import { NotificationsManager } from "../../helpers/NotificationsManager";

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

	const notifManager = new NotificationsManager(author);

	const currentFollower = await followers.findOne({
		userId: author._id,
		target: user._id,
	});

	if (currentFollower) {
		logger.printError("Duplicated");

		return res.status(400).send({
			status: 400,
			message: "Duplicated",
		});
	}

	const followId = crypto.randomBytes(32).toString("hex").slice(32);

	await followers.create({
		_id: followId,
		target: user._id,
		userId: author._id,
		createdAt: new Date(),
	});

	logger.printSuccess(
		`User ${author.safeUsername} (${req.params._id}) is following ${user.username}!`
	);

	const currentFollowersSize = await followers.count({ target: user._id });
	notifManager.generateFollowNotification(user);

	return res.status(200).send({
		status: 200,
		message: `You're following ${user._id} now!`,
		data: {
			size: currentFollowersSize,
			following: true,
		},
	});
};
