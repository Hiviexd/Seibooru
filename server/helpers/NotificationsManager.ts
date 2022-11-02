import { notifications, users } from "../../database";
import crypto from "crypto";
import { LoggerConsumer } from "./LoggerConsumer";

export class NotificationsManager {
	user: any;
	logger = new LoggerConsumer("Notifications Manager");

	constructor(user?: any) {
		this.user = user;
	}

	async generateFollowNotification(followerData: any) {
		this.logger.printWarning(
			`Generating follow notification for ${followerData.username} (${followerData._id}) | triggered by ${this.user.username} (${this.user._id})`
		);

		await notifications.create({
			_id: this.generateId(),
			target: followerData._id,
			content: `${this.user.username} is following you!`,
			createdAt: new Date(),
			extra: {
				icon: "faUserPlus",
				redirect: `/users/${this.user._id}`,
			},
		});

		this.logger.printSuccess(
			`Follow notification generated for ${followerData.username} (${followerData._id}) | triggered by ${this.user.username} (${this.user._id})`
		);
	}

	async generateLikeNotitication(post: any, count: number) {
		this.logger.printWarning(`Generating like notification for ${post._id}`);

		const postOwner = await users.findById(post.posterId);

		if (!postOwner) return;

		await notifications.create({
			_id: this.generateId(),
			target: postOwner._id,
			content:
				count == 1
					? `Your post got its first like!`
					: `Your post has ${count} likes!`,
			createdAt: new Date(),
			extra: {
				icon: "faHeart",
				redirect: `/posts?post=${post._id}`,
			},
		});

		this.logger.printSuccess(`Like notification generated for ${post._id} `);
	}

	async generateBanNotification(bannedUser: any) {
		this.logger.printWarning(
			`Generating ban notification for ${bannedUser.username} (${bannedUser._id})`
		);

		await notifications.create({
			_id: this.generateId(),
			target: bannedUser._id,
			content: `You have been banned for violating the rules.`,
			createdAt: new Date(),
			extra: {
				icon: "faGavel",
			},
		});

		this.logger.printSuccess(
			`Ban notification generated for ${bannedUser.username} (${bannedUser._id})`
		);
	}

	async generateUnbanNotification(unbannedUser: any) {
		this.logger.printWarning(
			`Generating unban notification for ${unbannedUser.username} (${unbannedUser._id})`
		);

		await notifications.create({
			_id: this.generateId(),
			target: unbannedUser._id,
			content: `You have been unbanned!`,
			createdAt: new Date(),
			extra: {
				icon: "faScaleBalanced",
			},
		});

		this.logger.printSuccess(
			`Unban notification generated for ${unbannedUser.username} (${unbannedUser._id})`
		);
	}

	generateId() {
		return crypto.randomBytes(20).toString("hex").slice(20);
	}
}
