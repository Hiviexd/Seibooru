import mongoose from "mongoose";
import User from "./schemas/User";
import Post, { IPost } from "./schemas/Post";
import { LoggerConsumer } from "../server/helpers/LoggerConsumer";
import dotenv from "dotenv";
import paginate from "mongoose-paginate-v2";
import Follower from "./schemas/Follower";

dotenv.config();

const logger = new LoggerConsumer("database");

logger.printInfo("Starting databse connection...");
mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
	(err) => {
		if (err)
			return logger.printError("An error has occurred:\n".concat(err.message));

		logger.printSuccess("Database connected!");
	}
);

interface PostDocument extends mongoose.Document<IPost> {}

Post.plugin(paginate);
export const users = mongoose.model("User", User);
export const followers = mongoose.model("Follower", Follower);
export const posts = mongoose.model<
	PostDocument,
	mongoose.PaginateModel<PostDocument>
>("Post", Post);
// //
// posts.find().then((post) => {
// 	posts.findByIdAndDelete(post?._id)
// })
