import path from "path";
import { readFileSync, writeFileSync } from "fs";

export function updateTrendingTag(tag: string, sum: boolean) {
	tag = tag.toString().toLowerCase();

	const currentCache = JSON.parse(
		readFileSync(path.resolve("./server/cache/Trending.json"), "utf8")
	);

	if (!tagExists()) {
		currentCache[tag] = 1;

		save();

		return;
	} else {
		if (sum) {
			currentCache[tag] += 1;
		} else {
			currentCache[tag] -= 1;
		}

		save();

		return;
	}

	function tagExists() {
		if (!currentCache[tag]) return false;

		return true;
	}

	function save() {
		writeFileSync(
			path.resolve("./server/cache/Trending.json"),
			JSON.stringify(currentCache),
			"utf8"
		);
	}
}
