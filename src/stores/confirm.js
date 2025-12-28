import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfirmStore = defineStore('dialog', () => {
  const isOpen = ref(false);

  const title = ref('');
  const message = ref('');
  const confirmText = ref('Agree');
  const cancelText = ref('Cancel');
  let resolver = null;

  const resetVars = () => {
    title.value = '';
    message.value = '';
    confirmText.value = 'Agree';
    cancelText.value = 'Cancel';
    resolver = null;
  };

  const showDialog = (titleWord, messageWord, agreeWord, cancelWord) => {
    title.value = titleWord;
    message.value = messageWord;
    confirmText.value = agreeWord;
    cancelText.value = cancelWord;
    isOpen.value = true;

    return new Promise((resolve) => {
      resolver = resolve;
    });
  };

  const handleAgree = () => {
    if (resolver){
      resolver(true);
    }
    isOpen.value = false;
    resetVars();
  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    isOpen.value = false;
  };


  return {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    showDialog,
    handleAgree,
    handleCancel,
  };
});
