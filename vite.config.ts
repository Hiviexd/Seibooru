import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mix from "vite-plugin-mix";

const mixDefault = mix;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		process.env.NODE_ENV == "production"
			? undefined
			: mixDefault.default({
					handler: "./server/server.ts",
			  }),
	],
	build: {
		outDir: "./dist",
	},
	server: {
		host: true,
	},
});
