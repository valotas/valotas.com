import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

const parcelCommonJs = [
  "packages/parcel-namer-staticsite/**/*.js",
  "packages/parcel-resolver-staticsite/**/*.js",
];

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.parcel-cache/**"],
  },
  eslint.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_|h",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "import/order": "error",
    },
  },
  {
    files: parcelCommonJs,
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["packages/parcel-namer-staticsite/**/*.js"],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
