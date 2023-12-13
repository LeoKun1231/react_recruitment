/*
 * @Author: hqk
 * @Date: 2023-02-16 11:20:26
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-05 12:52:05
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-empty-pattern': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}
