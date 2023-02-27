// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  settings: {
    "node": {
      "tryExtensions": [".js", ".json", ".node", ".ts", ".d.ts"],
    },
  },
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "plugin:node/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      path.join(__dirname, "tsconfig.json"),
      path.join(__dirname, "tsconfig.dev.json"),
    ],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    "node/no-unsupported-features/es-syntax": [
      "error",
      {ignores: ["modules"]},
    ],
  },
};
