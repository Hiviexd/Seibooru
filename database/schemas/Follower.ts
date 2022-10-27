import { Schema } from "mongoose";

export interface IFollower {
	_id: string;
	target: string;
	userId: string;
	createdAt: Date;
}

export default new Schema({
	_id: String,
	target: String,
	userId: String,
	createdAt: Date,
});
