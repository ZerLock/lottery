module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "consistent-return": "off",
    "no-throw-literal": "off",
    "no-useless-escape": "off",
  },
};
