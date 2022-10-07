import mongoose from "mongoose";
import User from "./schemas/User";
import Post from "./schemas/Post";
import { LoggerConsumer } from "../server/helpers/LoggerConsumer";
import dotenv from "dotenv";

dotenv.config();

const logger = new LoggerConsumer("database");

logger.printInfo("Starting databse connection...");
mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
	(err) => {
		if (err)
			return logger.printError(
				"An error has occurred:\n".concat(err.message)
			);

		logger.printSuccess("Database connected!");
	}
);

export const users = mongoose.model("User", User);
export const posts = mongoose.model("Post", Post);
// // 
// posts.find().then((post) => {
// 	posts.findByIdAndDelete(post?._id)
// })