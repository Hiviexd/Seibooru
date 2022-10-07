import { NextFunction, Request, Response } from "express";
import { LoggerConsumer } from "../helpers/LoggerConsumer";

export default async (req: Request, res: Response, next: NextFunction) => {
    const logger = new LoggerConsumer("isBanned", req);
    const userPerms = ["post:create", "post:update", "post:delete"];

    if (!req.body._MANAGER.permissions.some((perm: string) => userPerms.includes(perm))) {
        logger.printError("Unauthorized");
        return res.status(401).send({
            status: 401,
            message: "Unauthorized",
        });
    }

    return next();
}
