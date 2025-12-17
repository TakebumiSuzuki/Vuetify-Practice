import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    // 「Vuetifyのコンポーネントを、いちいち手動で import しなくても使えるようにする（かつ、ファイルサイズも小さくする）」
    //  という非常に便利な魔法の設定
    vuetify({ autoImport: true })
  ]
})