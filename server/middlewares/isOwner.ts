import { NextFunction, Request, Response } from "express";
import { LoggerConsumer } from "../helpers/LoggerConsumer";
import ownerUsername from "../../config.json";

export default async (req: Request, res: Response, next: NextFunction) => {
    const logger = new LoggerConsumer("isOwner", req);

    if (req.body._MANAGER.username != ownerUsername) {
        logger.printError("Unauthorized");
        return res.status(401).send({
            status: 401,
            message: "Unauthorized",
        });
    }

    return next();
}
