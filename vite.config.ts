import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    // 「Vuetifyのコンポーネントを、いちいち手動で import しなくても使えるようにする（かつ、ファイルサイズも小さくする）」
    //  という非常に便利な魔法の設定
    vuetify({ autoImport: true }),
  ],
  server: {
    // Webプレビューで公開するポートを指定（例: 8080）
    port: 8080,
    // VM外部からもアクセスできるように 0.0.0.0 を指定
    host: '0.0.0.0',

    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // もしFlask側で '/api' というプレフィックスをつけていないなら、
        // ここでパスを書き換える設定が必要です（下記※参照）
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
