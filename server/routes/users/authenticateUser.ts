import { Request, Response } from "express";
import { users } from "../../../database";
import { PasswordManager } from "../../helpers/PasswordManager";

export default async (req: Request, res: Response) => {
	const { username, password } = req.body;

	// ? Check if the provided data is valid
	if (
		!username ||
		!password ||
		typeof username != "string" ||
		typeof password != "string"
	)
		return res.status(400).send({
			status: 400,
			message: "Invalid credentials",
		});

	const user = await users.findOne({
		safeUsername: encodeURI(username.trim().toLowerCase()),
	});

	if (!user)
		return res.status(404).send({
			status: 404,
			message: "User not found",
		});

	const PasswordManager = new PasswordManager(password, user.passwordHash);

	if (!(await PasswordManager.isValid()))
		return res.status(400).send({
			status: 400,
			message: "Invalid password",
		});

	return res.status(200).send({
		status: 200,
		message: "Authorized!",
		data: {
			_id: user._id,
			username: user.username,
			accountToken: user.accountToken,
			authenticated: true,
			permissions: user.permissions,
		},
	});
};
