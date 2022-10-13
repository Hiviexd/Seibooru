import { Schema } from "mongoose";

export interface IPost {
	_id: string;
	filename: string;
	title: string;
	tags: string[];
	posterId: string;
	posterUsername: string;
	likes: string[];
	createdAt: Date;
}

export default new Schema({
	_id: String,
	filename: String,
	title: String,
	tags: [String],
	posterId: String,
	posterUsername: String,
	likes: [String],
	createdAt: Date,
});
