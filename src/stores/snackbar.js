import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSnackbarStore = defineStore('snackbar', () => {
  const isShow = ref(false);
  const message = ref('');
  const color = ref('');

  // トーストを表示するアクション
  function show(msg, type = 'tertiary') {
    isShow.value = true;

    message.value = msg;
    color.value = type;
  }

  return { isShow, message, color, show };
});
