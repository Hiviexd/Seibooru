import { Schema } from "mongoose";

export default new Schema({
	_id: String,
	username: String,
	safeUsername: String,
	passwordHash: String,
	accountToken: String,
	profile: {
		avatar: {
			data: Buffer,
			contentType: String,
		},
		bio: String,
	},
	permissions: {
		type: Array,
		default: ["post:create"],
	},
	createdAt: Date,
});
