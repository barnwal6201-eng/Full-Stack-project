import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended, // Applies standard JavaScript best practices
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // Automatically injects Node.js globals like 'process' and '__dirname'
      },
    },
    rules: {
      'no-console': 'off', // Allows console.log statements since this is a backend server
      'no-unused-vars': 'warn',
    },
  },
];
