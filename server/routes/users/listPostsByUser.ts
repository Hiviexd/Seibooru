import { Request, Response } from "express";
import { posts } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
    const logger = new LoggerConsumer("Post Listing", req);

    logger.printInfo("Loading user posts page...");

    const id = req.params.id;

};