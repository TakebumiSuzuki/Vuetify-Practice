<!-- App.vue -->
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useTheme } from 'vuetify';
  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue'; // ★作成したMainコンポーネントをインポート

  const theme = useTheme();

  // アプリ全体の初期設定
  onMounted(() => {
    theme.global.name.value = 'light';
  });
</script>

<template>
  <v-app>
    <AppHeader />

    <v-main>
      <AppMain />
    </v-main>
  </v-app>
</template>

