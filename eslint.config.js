import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import { flatConfigsToPlugins } from 'eslint-plugin-prettier';
import { globalIgnores } from 'eslint/config';
export default tseslint.config([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.recommended,
  reactHooks.configs['recommended'],
  reactRefresh.configs.vite,
]);