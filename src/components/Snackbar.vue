<script setup>
  import { useSnackbarStore } from '@/stores/snackbar'

  const snackbarStore = useSnackbarStore()

</script>

<template>
  <v-snackbar
      v-model="snackbarStore.isShow"
      :color="snackbarStore.color"
      :timeout="3000"
      location="top"
      transition="slide-y-reverse-transition"
      rounded="pill"
      variant="tonal"
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