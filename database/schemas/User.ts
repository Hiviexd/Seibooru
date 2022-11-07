import { Schema } from "mongoose";

export default new Schema({
	_id: String,
	username: String,
	safeUsername: String,
	passwordHash: String,
	accountToken: String,
	bio: String,
	permissions: {
		type: Array,
		default: ["post:create"],
		//? Available permissions: post:create, admin:post, admin:user, admin:admin
	},
	createdAt: Date,
});
