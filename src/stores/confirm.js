import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfirmStore = defineStore('dialog', () => {
  const isOpen = ref(false);

  const title = ref('');
  const message = ref('');
  const confirmLabel = ref('');
  const confirmColor = ref('');
  const cancelLabel = ref('');
  const cancelColor = ref('')
  let resolver = null;

  const resetVars = () => {
    title.value = '';
    message.value = '';
    confirmLabel.value = '';
    confirmColor.value = '';
    cancelLabel.value = '';
    cancelColor.value = '';
    resolver = null;
  };

  const showDialog = ({titleText, messageText, confirm, cancel}) => {
    resetVars();
    title.value = titleText;
    message.value = messageText;
    confirmLabel.value = confirm.label;
    confirmColor.value = confirm.color;
    cancelLabel.value = cancel.label;
    cancelColor.value = cancel.color
    isOpen.value = true;

    return new Promise((resolve) => {
      resolver = resolve;
    });
  };

  const handleConfirm = () => {
    if (resolver){
      resolver(true);
    }
    isOpen.value = false;

  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    isOpen.value = false;
  };


  return {
    isOpen,
    title,
    message,
    confirmLabel,
    confirmColor,
    cancelLabel,
    cancelColor,

    showDialog,
    handleConfirm,
    handleCancel,
  };
});
