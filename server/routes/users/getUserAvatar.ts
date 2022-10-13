import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import { existsSync } from "fs";
import path from "path";

export default async (req: Request, res: Response) => {
	const user = await users.findOne({ _id: req.params.id });

	if (!user)
		return res.status(200).sendFile(path.resolve("./public/defaultpfp.jpg"));

	if (!existsSync(path.resolve("./uploads/avatars/".concat(`${user._id}.jpg`))))
		return res.status(200).sendFile(path.resolve("./public/defaultpfp.jpg"));

	return res
		.status(200)
		.sendFile(path.resolve("./uploads/avatars/".concat(`${user._id}.jpg`)));
};
