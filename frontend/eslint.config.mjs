import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['.next/*', "src/components/ui/*"],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // React ✅
      'react/jsx-key': 'error',
      'react/prop-types': 'off',
      'react/no-unused-state': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/destructuring-assignment': ['warn', 'always'],

      //  Best Practices ✅
      'complexity': ['warn', { max: 10 }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],    
      'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: true }],

      //  Typescript ✅
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
