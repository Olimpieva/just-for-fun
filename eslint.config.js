import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

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
      "import-x/internal-regex": "^(api|app|assets|entities|pages|shared|store|widgets)(/|$)",
      "import-x/resolver-next": [createTypeScriptImportResolver()],
    },
    rules: {
      eqeqeq: ["error", "always", { null: "ignore" }],
      "consistent-return": "warn",
      "no-nested-ternary": "warn",
      "no-constant-condition": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "react/prop-types": "off",
      "react/no-unused-prop-types": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/destructuring-assignment": "warn",
      "import-x/no-extraneous-dependencies": "warn",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-cycle": ["error", { ignoreExternal: true }],
      "import-x/no-self-import": "error",
      "import-x/no-duplicates": ["error", { "prefer-inline": true }],
      "import-x/order": [
        "error",
        {
          groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
          pathGroups: [
            {
              pattern: "*.{css,scss}",
              patternOptions: { matchBase: true },
              group: "index",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          distinctGroup: true,
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          named: { enabled: true, types: "types-last" },
          warnOnUnassignedImports: true,
        },
      ],
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
              from: ["./src/widgets", "./src/pages", "./src/store"],
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
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "import-x/no-default-export": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExportAllDeclaration[exported=null]",
          message:
            "List public exports explicitly in index.ts; named namespace re-exports are allowed.",
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
      "import-x/no-extraneous-dependencies": ["warn", { devDependencies: true }],
    },
  },
  prettier,
);
