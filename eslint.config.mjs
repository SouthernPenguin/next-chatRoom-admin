import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:vue/vue3-essential',
  'prettier',

  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'double'],
      semi: ['error', 'never'],
    },
  },
];
