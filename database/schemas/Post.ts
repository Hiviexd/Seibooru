import { Schema } from "mongoose";

export default new Schema({
	_id: String,
	filename: String,
    title: String,
	tags: [String],
	posterId: String,
	posterUsername: String,
	likes: [String],
	createdAt: Date
});
