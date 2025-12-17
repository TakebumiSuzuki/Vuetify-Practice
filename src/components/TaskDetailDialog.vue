<script setup>
  import { computed } from 'vue';
  import {
    statusOptions,
    priorityOptions,
    getStatusColor,
    getPriorityColor,
  } from '../utils/taskUtils';

  const props = defineProps({
    modelValue: {
      // v-model="showDialog" の受け皿
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      default: null,
    },
  });

  const emit = defineEmits(['update:modelValue', 'open-new-tab']);

  // v-model の書き込み用 computed
  const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });

  const onOpenNewTab = () => {
    emit('open-new-tab', props.task);
  };
</script>

<template>
  <v-dialog
    v-model="isVisible"
    max-width="800px"
    scrollable
    transition="scroll-y-reverse-transition"
  >
    <v-card v-if="task" class="rounded-xl">
      <v-card-title class="d-flex align-center py-4 bg-surface-variant">
        <span class="text-h6 font-weight-bold">{{ task.title }} の詳細</span>
        <v-spacer />
        <v-btn
          icon="mdi-open-in-new"
          variant="text"
          class="mr-2 cursor-pointer"
          @click="onOpenNewTab"
        ></v-btn>
        <v-btn
          icon="mdi-close"
          variant="text"
          class="cursor-pointer"
          @click="isVisible = false"
        ></v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text style="max-height: 70vh">
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <div class="text-subtitle-1 font-weight-bold mb-2">説明</div>
              <p class="text-body-1 mb-6">{{ task.description }}</p>
              <div class="text-subtitle-1 font-weight-bold mb-2">詳細内容</div>
              <p class="text-body-2 text-medium-emphasis" style="white-space: pre-wrap">
                {{ task.fullDetails }}
              </p>
            </v-col>

            <v-col cols="12" md="4" class="bg-grey-lighten-4 rounded-lg pa-4">
              <div class="text-overline mb-2">編集・プロパティ</div>

              <div class="mb-4">
                <!-- 親のオブジェクトを直接編集する形になりますが、簡易的ならこれでOKです -->
                <v-select
                  v-model="task.status"
                  :items="statusOptions"
                  label="ステータス"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  :color="getStatusColor(task.status)"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip
                      :color="getStatusColor(item.raw)"
                      size="small"
                      class="mt-1 cursor-pointer"
                    >
                      {{ item.raw }}
                    </v-chip>
                  </template>
                </v-select>
              </div>

              <div class="mb-4">
                <v-select
                  v-model="task.priority"
                  :items="priorityOptions"
                  label="優先度"
                  variant="outlined"
                  density="compact"
                  hide-details
                  bg-color="white"
                  :color="getPriorityColor(task.priority)"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip
                      :color="getPriorityColor(item.raw)"
                      size="small"
                      variant="outlined"
                      class="mt-1 cursor-pointer"
                    >
                      {{ item.raw }}
                    </v-chip>
                  </template>
                </v-select>
              </div>

              <v-divider class="my-4"></v-divider>

              <div class="mb-4">
                <div class="text-caption text-medium-emphasis">担当者</div>
                <div class="d-flex align-center mt-1">
                  <v-avatar size="24" color="primary" class="mr-2 text-caption text-white">
                    {{ task.assignee.charAt(0) }}
                  </v-avatar>
                  {{ task.assignee }}
                </div>
              </div>

              <div>
                <div class="text-caption text-medium-emphasis">期限</div>
                <div class="mt-1">{{ task.dueDate }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn color="grey" variant="text" class="cursor-pointer" @click="isVisible = false"
          >閉じる</v-btn
        >
        <v-btn color="primary" variant="flat" class="cursor-pointer" @click="isVisible = false"
          >保存する</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer !important;
  }
</style>
