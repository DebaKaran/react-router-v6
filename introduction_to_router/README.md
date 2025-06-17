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
