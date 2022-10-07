import { Request, Response } from "express";
import { posts} from "../../../database";
import path from "path";

export default async (req: Request, res: Response) => {
    const id = req.params.id;

    const post = await posts.findById(id);

    if (!post) return res.status(404).send({
        status: 404,
        message: "Post not found!"
    })

    return res.status(200).sendFile(path.resolve(`./uploads/images/${post.filename}`))
};
