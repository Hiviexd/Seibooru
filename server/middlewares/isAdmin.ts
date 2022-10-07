import { NextFunction, Request, Response } from "express";
import { LoggerConsumer } from "../helpers/LoggerConsumer";

export default async (req: Request, res: Response, next: NextFunction) => {
    const logger = new LoggerConsumer("isAdmin", req);
    const adminPerms = ["admin:user", "admin:post"];

    if (!req.body._MANAGER.permissions.some((perm: string) => adminPerms.includes(perm))) {
        logger.printError("Unauthorized");
        return res.status(401).send({
            status: 401,
            message: "Unauthorized",
        });
    }
    
    return next();
}
