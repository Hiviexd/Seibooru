import { Schema } from "mongoose";

export interface INotification {
	_id: string;
	target: string;
	content: string;
	createdAt: Date;
	extra: [key: any];
}

export default new Schema({
	_id: String,
	target: String,
	content: String,
	createdAt: Date,
	extra: {
		type: Object,
		default: {},
	},
});
