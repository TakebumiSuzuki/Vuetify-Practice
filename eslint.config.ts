import pluginVue from 'eslint-plugin-vue'
import vueTs from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  // 1. チェック対象外のディレクトリ（旧 .eslintignore）
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // 2. Vueの推奨設定 (plugin:vue/vue3-recommended 相当)
  ...pluginVue.configs['flat/recommended'],

  // 3. TypeScript設定 (@vue/eslint-config-typescript 相当)
  // 以前の extends: ['@vue/eslint-config-typescript'] は関数呼び出しになりました
  ...vueTs(),

  // 4. Prettierとの競合回避 (@vue/eslint-config-prettier 相当)
  // ESLintでのフォーマットルールを無効化し、Prettierに任せます
  skipFormatting,

  // 5. カスタムルール（もしあればここに追加）
  // {
  //   rules: {
  //      'vue/multi-word-component-names': 'off',
  //   }
  // }
]