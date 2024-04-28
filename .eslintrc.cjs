module.exports = {
  root: true,
  env: { browser: false, es2020: true, node: true },
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    // 'no-unused-vars': 'warn',
  },
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'], // Apply to all TypeScript files
  //     rules: {
  //       '@typescript-eslint/no-unused-vars': 'warn', // Override to warning here
  //     },
  //   },
  // ],
}
