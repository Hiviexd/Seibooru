import { Request, Response } from "express";
import { notifications, users } from "../../../database";

export default async (req: Request, res: Response) => {
	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "User not found!",
		});

	await notifications.deleteMany({ target: user._id });

	return res.status(200).send({
		status: 200,
		message: "Notification cleared!",
	});
};
