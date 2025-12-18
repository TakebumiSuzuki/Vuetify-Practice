<script setup lang="ts">
  import { computed } from 'vue';
  import { useTheme } from 'vuetify';

  // ★ テーマ関連(ダークモード)のロジックはこのコンポーネント内で完結させます
  const theme = useTheme();
  const isDark = computed(() => theme.global.current.value.dark);

  const toggleTheme = () => {
    theme.global.name.value = isDark.value ? 'light' : 'dark';
  };
</script>

<template>
  <v-app-bar flat border="b" class="px-4" color="background">
    <v-app-bar-title class="font-weight-bold">MyApp</v-app-bar-title>

    <v-spacer />

    <v-btn variant="plain" class="text-link text-body-1 font-weight-bold">Test</v-btn>

    <v-divider vertical inset class="d-none d-md-flex mx-2" />

    <!-- テーマ切り替えボタン -->
    <v-btn icon variant="text" @click="toggleTheme" class="rounded-pill">
      <v-icon
        :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        class="text-opacity-adjustment"
      />
    </v-btn>

    <v-btn icon variant="text" class="rounded-pill">
      <v-icon icon="mdi-bell-outline" class="text-opacity-adjustment" />
    </v-btn>

    <v-btn icon class="ml-2 mr-2 rounded-pill">
      <v-avatar size="36">
        <v-img
          src="https://randomuser.me/api/portraits/men/85.jpg"
          alt="User"
          cover
          class="cursor-pointer"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
  .cursor-pointer {
    transition: opacity 0.2s;
  }
  .cursor-pointer:hover {
    opacity: 0.9;
  }
  .text-opacity-adjustment {
    opacity: 0.8;
  }

  .text-link {
    opacity: 1;
    padding: 0;
    position: relative;
    overflow: visible;
  }
  .text-link:hover {
    opacity: 1;
  }

  .text-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  .text-link:hover::after {
    transform: scaleX(1);
  }
</style>
