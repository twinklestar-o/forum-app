module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier', // tetap gunakan prettier dan airbnb
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react', 'vitest'], // tambahkan vitest plugin
  overrides: [
    {
      files: ['**/__test__/**/*.{js,jsx}', '**/*.test.{js,jsx}'],
      env: { jest: true }, // ✅ pakai Jest env (Vitest kompatibel dengan Jest)
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': 'warn',
    'import/order': 'off',
  },
};
