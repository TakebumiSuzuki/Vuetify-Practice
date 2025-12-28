<script setup>
  import { useConfirmStore } from '../stores/confirm';
  const dialogStore = useConfirmStore();
</script>

<template>
  <v-dialog
    v-model="dialogStore.isOpen"
    max-width="500"
    persistent
    transition="scroll-y-reverse-transition"
  >
    <v-card class="rounded-xl  bg-surfaceBright">
      <v-card-title class="d-flex align-center py-4">
        {{ dialogStore.title }}
      </v-card-title>

      <v-divider  color="on-surfaceBright" opacity="0.25" />

      <v-card-text>
        {{ dialogStore.message }}
      </v-card-text>

      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn
          variant="tonal"
          :color="dialogStore.cancelColor"
          class="mr-2 px-4  font-weight-bold"
          @click="dialogStore.handleCancel()"
        >
          {{ dialogStore.cancelLabel }}
        </v-btn>

        <!-- 薄い赤背景 + 濃い赤文字 -->
        <v-btn
          :color="dialogStore.confirmColor"
          variant="tonal"
          class="px-6 font-weight-bold"
          @click="dialogStore.handleConfirm()"
        >
          {{ dialogStore.confirmLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
