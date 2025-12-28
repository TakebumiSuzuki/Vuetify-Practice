<script setup>
  import { useSnackbarStore } from '@/stores/snackbar';

  const snackbarStore = useSnackbarStore();
</script>

<template>
  <v-snackbar
    v-model="snackbarStore.isShow"
    :color="snackbarStore.color"
    :timeout="3000"
    location="top"
    transition="slide-y-transition"
    rounded="pill"
    variant="tonal"
    class="custom-snackbar"
  >
    {{ snackbarStore.message }}

    <template v-slot:actions>
      <v-btn
        variant="plain"
        icon="mdi-close-circle"
        density="compact"
        @click="snackbarStore.isShow = false"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
  .custom-snackbar :deep(.v-snackbar__wrapper) {
    min-width: 200px !important; /* 最小幅 */
    max-width: 400px !important; /* 最大幅 */
    padding: 0px 30px !important; /* 内側の余白も調整 */
  }

  .custom-snackbar{
    top: -64px !important;
  }
</style>
