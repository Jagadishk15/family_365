module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['android/**', 'ios/**', 'node_modules/**', '**/build/**'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    'no-catch-shadow': 'warn',
    eqeqeq: 'warn',
  },
};
