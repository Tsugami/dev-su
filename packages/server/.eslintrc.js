module.exports = {
  env: {
    jest: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] },
    ],
    'consistent-return': 'off',
    'prettier/prettier': 'error',
    'import/extensions': 'off',
  },
};
