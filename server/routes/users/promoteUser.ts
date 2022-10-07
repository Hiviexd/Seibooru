import { Router, Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import * as middlewares from "../../middlewares";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("promoteUser", req);
    const adminPerms = ["admin:user", "admin:post"];
    
    logger.printInfo(`Promoting user ${req.params.id}`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    for (let perm in adminPerms) {
        if (user.permissions.includes(perm)) {
            logger.printError("User already has this permission");
            return res.status(400).send({
                status: 400,
                message: "User already has this permission",
            });
        }
    }

    const newPerms = user.permissions.concat(adminPerms);

    const updatedUser = await users.findOneAndUpdate(
        { _id: req.params.id },
        { permissions: newPerms },
        { new: true }
    );

    logger.printSuccess(`User ${user.safeUsername} (${req.params._id}) promoted!`);

    return res.status(200).send({
        status: 200,
        message: "User promoted!",
        data: updatedUser,
    });
};
