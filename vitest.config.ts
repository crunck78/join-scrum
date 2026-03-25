import angular from "@analogjs/vite-plugin-angular";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [angular()],
	test: {
		globals: true,
		setupFiles: ["src/test-setup.ts"],
		reporters: ["default"],
		coverage: {
			provider: "v8",
			enabled: true,
			reporter: ["text", "json", "html", "default"],
		},
		browser: {
			provider: playwright(),
			enabled: true,
			// at least one instance is required
			instances: [{ browser: "chromium" }],
		},
	},
});
