import { Request, Response } from "express";
import { users } from "../../../database";

export default async (req: Request, res: Response) => {
	const user = await users.findOneAndUpdate(
		{ _id: req.params.id },
		{ isBanned: false },
        { new: true }
	);

	if (!user) return res.status(404).send("User not found");
};
