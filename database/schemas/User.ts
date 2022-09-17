import { Schema } from "mongoose";

export default new Schema({
	_id: String,
	username: String,
	passwordHash: String,
	profile: {
		pfp: {
			data: Buffer,
			contentType: String,
		},
		bio: String,
	},
	posts: [String],
	comments: [String],
	createdAt: Date,
	isAdmin: Boolean,
	isBanned: Boolean,
});
