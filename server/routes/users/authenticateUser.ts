import { Request, Response } from "express";

export default (req: Request, res: Response) => {
	const { username, password } = req.body;

    // ? Check if the provided data is valid
    if (!username || password || typeof username != "string" || typeof password != "string") return res.status(400).send({
        status: 400,
        message: "Invalid credentials"
    })
};
