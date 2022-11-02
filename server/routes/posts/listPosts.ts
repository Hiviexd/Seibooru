import { Request, Response } from "express";
import { posts } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("Post Listing", req);

	logger.printInfo("Loading page...");
	let offset = Number(req.query.page) || 1;
	const search = (req.query.query || "").toString().trim() || "";
	const maxPerPage = 20;

	const result = await posts.paginate(
		search != undefined && search != ""
			? {
					tags: { $in: search.split(",") },
					archived: false,
			  }
			: {
					archived: false,
			  },
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
