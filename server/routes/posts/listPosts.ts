import { Request, Response } from "express";
import { posts } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("Post Listing", req);

    logger.printInfo("Loading page...")
    let index = Number(req.query.page) || 0;

    isNaN(index) ? index = 0 : index;

    const page = getPage()

    const listing = await posts.find().skip(page);
    const totalPages = (await posts.countDocuments()) / 25;

    function getPage() {
        const maxByPage = 25;
        if (index == 0) return 0;

        return maxByPage * index;
    }

    function roundTotalPages() {
        const float = Number("0.".concat(totalPages.toString().split(".")[1]));
        
        if (float > 0) return Math.round(totalPages + 1);

        return Math.round(totalPages)
    }

    return res.status(200).send({
        status: 200,
        data: {
            totalPages: roundTotalPages(),
            posts: listing
        }
    })
};
