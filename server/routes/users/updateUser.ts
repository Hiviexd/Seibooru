import { Request, Response } from "express";
import { users } from "../../../database";
import { createWriteStream } from "fs";
import path from "path";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("updateUser", req);
	const { bio } = req.body;

	const user = await users.findOne({
		accountToken: req.headers.authorization,
	});

	if (!user) {
		logger.printError("User not found");
		return res.status(404).send({
			status: 404,
			message: "User not found",
		});
	}

	logger.printInfo(`updating user ${user.username}`);

	//? handle bio
    
    bio ? (user.bio = bio) : null;

	//? handle avatar

	const allowedMimeTypes = ["image/png", "image/jpeg", "image/gif"];

	if (req.file && !allowedMimeTypes.includes(req.file.mimetype))
		return res.status(400).send({
			status: 400,
			message: "Invalid image!",
		});

	if (req.file) {
		const avatarPath = path.resolve("./uploads/avatars/".concat(`${user._id}.jpg`));
		createWriteStream(avatarPath).write(new Uint8Array(req.file.buffer));
	}

	const updatedUser = await users.findOneAndUpdate(
		{ _id: user._id },
		{ bio },
		{ new: true }
	);

	logger.printSuccess("User updated successfully");

	return res.status(200).send({
		status: 200,
		message: "User updated successfully",
		user: updatedUser,
	});
};
