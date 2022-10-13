import path from "path";
import { readFileSync } from "fs";

export function getTrendingTags() {
	const currentCache = JSON.parse(
		readFileSync(path.resolve("./server/cache/Trending.json"), "utf8")
	);

	const tags: { tag: string; size: number }[] = [];

	Object.keys(currentCache).forEach((key) => {
		tags.push({ tag: key, size: currentCache[key] });
	});

	return tags;
}
