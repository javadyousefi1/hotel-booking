export default {
  ignorePatterns: [".next/*"],
  ignores: [".next/*"],
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Next.js doesn't require React import
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn for unused vars except with _
    'unused-imports/no-unused-imports': 'error', // Auto-remove unused imports
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
