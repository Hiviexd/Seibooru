import { users } from "../../database";
import { LoggerConsumer } from "../helpers/LoggerConsumer";
import config from "./../../config.json";

export async function UpdateOwner() {
	const logger = new LoggerConsumer("UpdateOwner");

	const ownerUser = await users.findOne({ safeUsername: config.ownerUsername });

	if (!ownerUser) {
		logger.printError("Can't set website owner!");

		return;
	}

	if (!ownerUser.permissions.includes("admin:admin")) {
		logger.printWarning("Configuring website owner...");

		const currentOwner = await users.findOne({
			permissions: {
				$in: ["admin:admin"],
			},
		});

		if (!currentOwner) {
			logger.printWarning("Updating first-run website owner config...");

			ownerUser.permissions.push("admin:admin");
		} else {
			logger.printWarning("Website owner changed. Updating permissions...");

			await users.findByIdAndUpdate(currentOwner._id, {
				permissions: currentOwner.permissions.filter((p) => p != "admin:admin"),
			});
		}

		await users.findByIdAndUpdate(ownerUser._id, {
			permissions: ownerUser.permissions,
		});

		logger.printSuccess("Website owner configured!");
	} else {
		logger.printSuccess("Website owner is already configured!");
	}
}
