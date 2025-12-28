<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useTheme } from 'vuetify';

  import Dialog from './components/ConfirmDialog.vue';
  import AppHeader from './components/AppHeader.vue';
  import AppMain from './components/AppMain.vue';
  import Snackbar from './components/Snackbar.vue'

  const theme = useTheme();

  onMounted(() => {
    theme.global.name.value = 'light';
  });
</script>

<template>
  <v-app>
    <AppHeader />

    <v-main>
      <RouterView/>
    </v-main>

    <Dialog />

    <Snackbar/>


  </v-app>
</template>
