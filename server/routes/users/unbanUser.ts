import { Router, Request, Response } from "express";
import { posts, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../helpers/NotificationsManager";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("unbanUser", req);
	const userPerms = ["post:create"];

	logger.printInfo(`Unbanning user ${req.params.id}`);

	const user = await users.findOne({ _id: req.params.id });

	if (!user) {
		logger.printError("User not found");
		return res.status(404).send({
			status: 404,
			message: "User not found",
		});
	}

	//? exclude already unbanned users
	if (user.permissions.some((perm: string) => userPerms.includes(perm))) {
		logger.printError("User is not banned");
		return res.status(400).send({
			status: 400,
			message: "User is not banned",
		});
	}

	const notifManager = new NotificationsManager(user);

	user.permissions = [...user.permissions, ...userPerms];

	const updatedUser = await users.findOneAndUpdate(
		{ _id: req.params.id },
		{ permissions: user.permissions },
		{ new: true }
	);

	await posts.updateMany(
		{ posterId: user._id },
		{
			archived: false,
		}
	);

	logger.printSuccess(
		`User ${user.safeUsername} (${req.params._id}) unbanned!`
	);

	notifManager.generateUnbanNotification(user);

	return res.status(200).send({
		status: 200,
		message: "User unbanned!",
		data: updatedUser,
	});
};
