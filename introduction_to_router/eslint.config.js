import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  js.configs.recommended, // <--- as object, inside array
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      'unused-imports': pluginUnusedImports
    },
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]);
