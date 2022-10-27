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
		default: ["post:create", "post:update", "post:delete"],
		//? Available permissions: post:create, post:update, post:delete, admin:post, admin:user
	},
	createdAt: Date,
});
