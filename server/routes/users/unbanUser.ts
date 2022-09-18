import { Request, Response } from "express";
import { users } from "../../../database";
import { LoggerConsumer } from "../../helpers/LoggerConsumer";

export default async (req: Request, res: Response) => {
	const logger = new LoggerConsumer("unbanUser", req);
    const adminPerms = ["admin:user", "admin:post"];
    const userPerms = ["post:create", "post:update", "post:delete"];

    //! only users with admin perms can access this route
    if (!req.body._MANAGER.permissions.some((perm: string) => adminPerms.includes(perm))) {
        logger.printError("Unauthorized");
        return res.status(401).send({
            status: 401,
            message: "Unauthorized",
        });
    }
    
    logger.printInfo(`Unbanning user ${req.params.id}`);

    const user = await users.findOne({ _id: req.params.id });

    if (!user) {
        logger.printError("User not found");
        return res.status(404).send({
            status: 404,
            message: "User not found",
        });
    }

    //? exclude already unbanned users
    if (!user.permissions.some((perm: string) => userPerms.includes(perm))) {
        logger.printError("User is not banned");
        return res.status(400).send({
            status: 400,
            message: "User is not banned",
        });
    }

    user.permissions = [...user.permissions, ...userPerms];

    const updatedUser = await users.findOneAndUpdate(
        { _id: req.params.id },
        { permissions: user.permissions },
        { new: true }
    );

    logger.printSuccess(`User ${user.safeUsername} (${req.params._id}) unbanned!`);

    return res.status(200).send({
        status: 200,
        message: "User unbanned!",
        data: updatedUser,
    });
}
