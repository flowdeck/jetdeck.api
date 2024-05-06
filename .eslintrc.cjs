// module.exports = {
//   root: true,
//   env: { node: true, es2020: true },
//   extends: ['eslint:recommended'],
//   ignorePatterns: ['dist', '.eslintrc.mjs'],

//   rules: {
//     'no-unused-vars': 'error',
//   },
// }

// export default [
//   {
//     rules: {
//       semi: 'error',
//       'prefer-const': 'error',
//       'no-unused-vars': 'error',
//     },
//   },
// ]

module.exports = {
  root: true,
  env: { node: true, es2020: true },
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'no-unused-vars': 'warn',
  },
}
