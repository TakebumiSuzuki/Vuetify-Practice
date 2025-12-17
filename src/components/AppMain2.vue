<script setup>
  import { ref, watch, nextTick } from 'vue';
  const fancyDialog = ref(false);
  const showCard = ref(false);

  watch(fancyDialog, async (newVal) => {
    if (newVal) {
      await nextTick();
      showCard.value = true;
    } else {
      showCard.value = false;
    }
  });
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="fancyDialog"
      width="500"
      :scrim="true"
      :transition="false"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="secondary" v-bind="props" prepend-icon="mdi-arrow-up-bold-box-outline">
          フワッと表示する
        </v-btn>
      </template>

      <Transition name="my-slow-fade-up">
        <v-card v-show="showCard">
          <v-toolbar color="primary" title="アニメーション付き"></v-toolbar>

          <v-card-text class="pa-4">
            下からスライドしてフワッと現れました。<br />
            transitionプロパティを変えるだけで動きが変わります。
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="fancyDialog = false">閉じる</v-btn>
          </v-card-actions>
        </v-card>
      </Transition>
    </v-dialog>
  </div>
</template>

<style scoped>
  .my-slow-fade-up-enter-active,
  .my-slow-fade-up-leave-active {
    transition:
      transform 0.8s ease,
      opacity 0.8s ease;
  }

  .my-slow-fade-up-enter-from,
  .my-slow-fade-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>