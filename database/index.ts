import mongoose from "mongoose";
import User from "./schemas/User";
import Post from "./schemas/Post";
import * as consoleLog from "../server/helpers/consoleLog";
import dotenv from "dotenv";

dotenv.config();

consoleLog.blue("Database", "Starting databse connection...");
mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
	(err) => {
		if (err)
			return consoleLog.red(
				"database",
				"An error has occurred:\n".concat(err.message)
			);

		consoleLog.green("database", "Database connected!");
	}
);

export const users = mongoose.model("User", User);
export const posts = mongoose.model("Post", Post);