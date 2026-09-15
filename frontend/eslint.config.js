// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
    {
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        // 💡 CHANGE THIS from "detect" to your explicit React major version (e.g., "18" or "19")
        // This stops the auto-detection engine from firing and crashing ESLint v10.
        version: "18",
      },
    },
  },
];
