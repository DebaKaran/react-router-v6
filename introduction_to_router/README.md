# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

1: npm install
2: npm run dev
3: change the port ( react + ts + vite):

A: If you don’t have a vite.config.ts yet, generate one:

npx vite

# or if already created, open vite.config.ts

B: Inside vite.config.ts, configure the server like this:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
plugins: [react()],
server: {
port: 3000, // Change this to any port you want
open: true, // optional, opens browser automatically
},
});

or:

Alternative:

You can also pass the port as a CLI argument when running vite:

vite --port 3000

or if you're using npm/yarn: npm run dev -- --port 3000

4: Install ESLint and plugins:

npm install -D eslint
npm install -D eslint-plugin-react eslint-plugin-react-hooks
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

5: Initialize ESLint config: npx eslint --init

If you see this ESLint error when running npm run lint: 'react' must be in scope when using JSX react/react-in-jsx-scope

It happens because React 17+ and Vite use the new "automatic JSX runtime" — import React from 'react' is no longer needed.
You can fix this by adding the following to your ESLint config:

rules: { "react/react-in-jsx-scope": "off" },
settings: { react: { version: "detect" } }

-- Airbnb JS Style Guide

ESLint Installation Notes (React + Vite + SWC + TypeScript):

1: This project uses Vite + React + TypeScript + SWC template, which already installs:

A: @typescript-eslint/eslint-plugin@8.34.1

B: @typescript-eslint/parser@8.34.1

2: Tried installing Airbnb config → Failed due to version conflicts (Airbnb requires older ESLint v8.x, project uses ESLint v9.x)

Example error:
peer eslint@"^7.32.0 || ^8.2.0" from eslint-config-airbnb@19.0.4

3: Tried installing eslint-config-standard-with-typescript → Failed due to version conflicts (requires older @typescript-eslint v6.x, project uses v8.34.1)

Example error:
peer @typescript-eslint/eslint-plugin@"^6.4.0" from eslint-config-standard-with-typescript@43.0.1

Reason: Vite + SWC template is very new, many configs are not yet compatible with the latest eslint + typescript-eslint

4: Downgrading ESLint or typescript-eslint caused new conflicts

Not compatible with Vite 5 + SWC setup.

Would break other tooling or create more upgrade issues.

5: Final Working Solution:
Installed only what’s needed to lint React + TypeScript in a Vite+SWC setup:

npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react

Then, created .eslintrc.json:

{
"extends": [
"eslint:recommended",
"plugin:@typescript-eslint/recommended",
"plugin:react/recommended"
],
"parser": "@typescript-eslint/parser",
"parserOptions": {
"project": "./tsconfig.json"
},
"plugins": ["@typescript-eslint", "react"],
"rules": {}
}

Now works with: npm run lint

-- Using ESLint v9 config format (eslint.config.js) — not .eslintrc.json

- Using ESLint v9 (`eslint.config.js`)
- Based on:
  - `@eslint/js` recommended
  - `typescript-eslint`
  - `eslint-plugin-react`
- Does not use `airbnb`

--
1: Installed Prettier + eslint-config-prettier + eslint-plugin-prettier
2: Updated eslint.config.js to integrate Prettier
3: Now Prettier formatting issues are shown as ESLint errors
4: Can run npm run lint:fix to auto-fix both ESLint and Prettier issues

--
Prettier & Auto-formatting:

This project uses Prettier integrated with ESLint to enforce consistent code style.

A: You can manually run formatting with: npm run format
B: To auto-format on file save in VS Code:

B1: Install the VS Code extensions:

ESLint

Prettier - Code Formatter

B2: Add this to .vscode/settings.json:

{
"editor.codeActionsOnSave": {
"source.fixAll": true,
"source.fixAll.eslint": true
},
"editor.formatOnSave": true,
"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}

Now, when you save any .js, .ts, .jsx, or .tsx file, Prettier will automatically fix and format your code according to project rules.
