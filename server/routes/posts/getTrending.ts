import { Request, Response } from "express";
import { getTrendingTags } from "../../trending/getTrendingTags";

export default async (req: Request, res: Response) => {
	const allTags = getTrendingTags();

	allTags.sort((a, b) => b.size - a.size);
	allTags.splice(51, 9999999);

	return res.status(200).send({
		status: 200,
		data: allTags,
	});
};
