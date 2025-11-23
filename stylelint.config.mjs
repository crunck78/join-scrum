/** @type {import("stylelint").Config} */
export default {
	extends: ["stylelint-config-recommended-scss"],
	plugins: ["@stylistic/stylelint-plugin"],
	rules: {
		"no-empty-source": null,
		"no-invalid-double-slash-comments": true,
		"@stylistic/indentation": "tab",
	},
};
