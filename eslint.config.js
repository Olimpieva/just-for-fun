import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { importX } from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["build", "coverage", "public", "node_modules"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
      "import-x/resolver-next": [createTypeScriptImportResolver()],
    },
    rules: {
      eqeqeq: ["error", "always", { null: "ignore" }],
      "consistent-return": "warn",
      "no-nested-ternary": "warn",
      "no-constant-condition": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/no-unused-prop-types": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/destructuring-assignment": "warn",
      "import-x/no-extraneous-dependencies": "warn",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: ["./src/pages", "./src/widgets", "./src/entities"],
              from: "./src/app",
            },
            {
              target: "./src/entities",
              from: ["./src/widgets", "./src/pages"],
            },
            { target: "./src/widgets", from: "./src/pages" },
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["entities/*/*", "widgets/*/*", "pages/*/*"],
              message: "Import slices through their public API (index.ts).",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "src/setupTests.ts", "*.config.{js,ts}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "import-x/no-extraneous-dependencies": [
        "warn",
        { devDependencies: true },
      ],
    },
  },
  prettier,
);
