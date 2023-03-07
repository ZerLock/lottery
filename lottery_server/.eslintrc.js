module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'no-floating-promise'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
	},
};
