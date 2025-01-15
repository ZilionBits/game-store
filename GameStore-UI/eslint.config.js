module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: 'detect' },
    'import/resolver': { node: { paths: ['src'], extensions: ['.js', '.jsx'] } },
  },
  plugins: ['react-refresh'],
  rules: {
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
