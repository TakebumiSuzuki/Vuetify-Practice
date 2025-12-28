<script setup>
  import { ref } from 'vue';

  const props = defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue', 'save']);

  const isEditing = ref(false);
  const localValue = ref('');

  // 編集開始：現在の値をコピーしてモード切替
  const startEditing = () => {
    localValue.value = props.modelValue;
    isEditing.value = true;
  };

  // キャンセル：モードを戻すだけ
  const cancel = () => {
    isEditing.value = false;
  };

  // 保存：親に変更を通知
  const save = () => {
    // 値が変わっていれば通知
    if (localValue.value !== props.modelValue) {
      emit('update:modelValue', localValue.value);
      emit('save', localValue.value);
    }
    isEditing.value = false;
  };
</script>

<template>
  <div class="safe-editor">
    <!-- A. 閲覧モード -->
    <div
      v-if="!isEditing"
      class="d-flex align-start group"
    >
      <!-- テキスト本体 -->
      <div
        class="flex-grow-1 text-body-1"
        style="white-space: pre-wrap"
      >
        {{ modelValue || '（記述なし）' }}
      </div>

      <!-- 鉛筆ボタン（ホバー時のみ表示） -->
      <v-btn
        icon="mdi-pencil"
        variant="text"
        size="small"
        color="grey"
        class="ml-2 mt-n1 opacity-0-hover"
        @click="startEditing"
      ></v-btn>
    </div>

    <!-- B. 編集モード -->
    <div
      v-else
      class="edit-area pa-3 rounded border bg-grey-lighten-5"
    >
      <v-textarea
        v-model="localValue"
        variant="outlined"
        bg-color="white"
        auto-grow
        rows="2"
        hide-details
        autofocus
        class="mb-3"
      ></v-textarea>

      <div class="d-flex justify-end gap-2">
        <v-btn
          variant="text"
          size="small"
          color="grey-darken-1"
          class="mr-2"
          @click="cancel"
        >
          キャンセル
        </v-btn>

        <v-btn
          color="primary"
          size="small"
          elevation="1"
          @click="save"
        >
          保存
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* 親要素(.group)をホバーした時だけ、このクラスがついた要素を表示 */
  .group:hover .opacity-0-hover {
    opacity: 1 !important;
  }

  /* 通常時は透明（見えないがそこに存在する） */
  .opacity-0-hover {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
</style>
