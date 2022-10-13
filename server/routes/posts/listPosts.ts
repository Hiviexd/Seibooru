import { Request, Response } from "express";
import { posts } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("Post Listing", req);

	logger.printInfo("Loading page...");
	let offset = Number(req.query.page) || 1;
	const maxPerPage = 20;

	const result = await posts.paginate(
		{},
		{
			limit: maxPerPage,
			page: offset,
			sort: {
				createdAt: -1,
			},
		}
	);

	return res.status(200).send({
		status: 200,
		data: {
			totalPages: result.totalPages,
			posts: result.docs,
		},
	});
};
