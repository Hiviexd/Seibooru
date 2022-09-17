import { Request, Response } from "express";
import { users } from "../../../database";

export default async (req: Request, res: Response) => {
    const user = await users.findOne({ _id: req.params.id });

    if (!user) return res.status(404).send("User not found");

    res.send(user);
};