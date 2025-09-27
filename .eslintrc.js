module.exports = {
env: {
browser: true,
es2021: true,
node: true,
},
extends: ['airbnb', 'plugin:react/recommended'],
parserOptions: {
ecmaFeatures: {
jsx: true,
},
ecmaVersion: 'latest',
sourceType: 'module',
},
settings: {
react: {
version: 'detect',
},
},
rules: {
'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
'react/react-in-jsx-scope': 'off',
'react/prop-types': 'off',
'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
'no-console': 'warn',
},
};