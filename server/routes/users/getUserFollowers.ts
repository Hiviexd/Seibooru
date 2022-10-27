import { Request, Response } from "express";
import { followers, users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import crypto from "crypto";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("getUser", req);

	const author = await users.findOne({
		accountToken: req.headers.authorization || "",
	});

	logger.printInfo(
		`${author ? author.username : "$$Guest User"} is trying to follow user ${
			req.params.id
		}`
	);

	const user = await users.findOne({ _id: req.params.id });

	if (!user) {
		logger.printError("User not found");
		return res.status(404).send({
			status: 404,
			message: "User not found",
		});
	}

	const currentFollowersSize = await followers.count({ target: user._id });

	async function getFollowing() {
		if (!user)
			return {
				mutual: false,
				following: false,
			};

		const mutualCheck = author
			? (await followers.findOne({ userId: user._id, target: author._id })) ||
			  undefined
			: undefined;

		const followingCheck = author
			? (await followers.findOne({ userId: author._id, target: user._id })) ||
			  undefined
			: undefined;

		return {
			mutual: mutualCheck != undefined,
			following: followingCheck != undefined,
		};
	}

	return res.status(200).send({
		status: 200,
		message: `Followers statistics for ${user.username}`,
		data: {
			size: currentFollowersSize,
			statistics: await getFollowing(),
		},
	});
};
