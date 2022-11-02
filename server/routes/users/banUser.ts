import { Request, Response } from "express";
import { posts, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { NotificationsManager } from "../../helpers/NotificationsManager";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("banUser", req);
	const adminPerms = ["admin:user", "admin:post"];
	const userPerms = ["post:create"];

	logger.printInfo(`Banning user ${req.params.id}`);

	const user = await users.findOne({ _id: req.params.id });

	if (!user) {
		logger.printError("User not found");
		return res.status(404).send({
			status: 404,
			message: "User not found",
		});
	}

	const notifManager = new NotificationsManager(user);

	//? disallow admins from banning other admins
	if (user.permissions.some((perm: string) => adminPerms.includes(perm))) {
		logger.printError("Cannot ban other admins");
		return res.status(400).send({
			status: 400,
			message: "Cannot ban other admins",
		});
	}

	user.permissions = user.permissions.filter(
		(perm: string) => !userPerms.includes(perm)
	);

	const updatedUser = await users.findOneAndUpdate(
		{ _id: req.params.id },
		{ permissions: [] },
		{ new: true }
	);

	await posts.updateMany(
		{ posterId: user._id },
		{
			archived: true,
		}
	);

	logger.printSuccess(`User ${user.safeUsername} (${req.params._id}) banned!`);

	notifManager.generateBanNotification(user);

	return res.status(200).send({
		status: 200,
		message: "User banned!",
		data: updatedUser,
	});
};
