import { Router, Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";
import * as middlewares from "../../middlewares";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("demoteUser", req);
    const adminPerms = ["admin:user", "admin:post"];

    logger.printInfo(`Demoting user ${req.params.id}`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    user.permissions = user.permissions.filter((perm) => !adminPerms.includes(perm));

    const updatedUser = await users.findOneAndUpdate(
        { _id: req.params.id },
        { permissions: user.permissions },
        { new: true }
    );

    logger.printSuccess(`User ${user.safeUsername} (${req.params._id}) demoted!`);

    return res.status(200).send({
        status: 200,
        message: "User demoted!",
        data: updatedUser,
    });
}