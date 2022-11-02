import { Request, Response } from "express";
import { notifications, users } from "../../../database";

export default async (req: Request, res: Response) => {
	const id = req.params.id;

	const notification = await notifications.findById(id);
	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!notification)
		return res.status(404).send({
			status: 404,
			message: "Notification not found!",
		});

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "User not found!",
		});

	if (notification.target != user._id)
		return res.status(401).send({
			status: 401,
			message: "Unauthorized!",
		});

	await notifications.deleteOne({ _id: notification._id });

	return res.status(200).send({
		status: 200,
		message: "Notification deleted!",
	});
};
