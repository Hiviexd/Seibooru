import { Request, Response } from "express";
import { users } from "../../../database";
import crypto from "crypto";
import { PasswordManager } from "../../helpers/passwordManager";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("registerUser", req);
	const { username, password } = req.body;

	logger.printInfo("Registering a new user...");

	// ? Check if the provided data is valid
	if (
		!username ||
		!password ||
		typeof username != "string" ||
		typeof password != "string"
	) {
		logger.printError("Process failed with code 400: Invalid credentials");

		return res.status(400).send({
			status: 400,
			message: "Invalid credentials",
		});
	}
	const user = await users.findOne({
		safeUsername: encodeURI(username.trim().toLowerCase()),
	});

	if (user) {
		logger.printError(
			"Process failed with code 403: Username already taken"
		);

		return res.status(403).send({
			status: 403,
			message: "Username already taken!",
		});
	}

	const passwordManager = new PasswordManager(password);
	const passwordHash = await passwordManager.generateHash();
	const userId = crypto.randomBytes(10).toString("hex").slice(10);
	const accountToken = crypto.randomBytes(30).toString("hex").slice(30);

	await users.create({
		_id: userId,
		username: username.trim(),
		safeUsername: encodeURI(username.trim().toLowerCase()),
		accountToken: accountToken,
		passwordHash: passwordHash,
		createdAt: new Date(),
		permissions: ["post:create", "post:update", "post:delete"],
	});

	const createdUser = await users.findById(userId);

	logger.printSuccess(`New user created! ${username} (${userId})`);

	return res.status(200).send({
		status: 200,
		message: "Authorized!",
		data: createdUser,
	});
};
