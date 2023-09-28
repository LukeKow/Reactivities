module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,

  },
  plugins: ['react', '@typescript-eslint', 'json-format'],
  rules: {
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/indent': 0,
    'import/prefer-default-export': 0,
    // 'react/require-default-props': 0,
  },
};
