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

	const response = await notifications.find({ target: user._id });

	return res.status(200).send({
		status: 200,
		message: "Notification found!",
		data: response.sort(
			(a, b) =>
				new Date(b.createdAt || new Date()).valueOf() -
				new Date(a.createdAt || new Date()).valueOf()
		),
	});
};
