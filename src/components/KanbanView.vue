<script setup>
  import { ref, watch } from 'vue';
  import { VueDraggable } from 'vue-draggable-plus';
  import {
    statusOptions,
    getStatusColor,
    getPriorityColor,
  } from '@/utils/taskUtils';

  const emit = defineEmits([
    'open-dialog',
    'open-new-tab',
    'update-status',
    'update-priority',
  ]);

  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  // --- 初期化 ---
  const initialLanes = {};
  statusOptions.forEach((s) => (initialLanes[s] = []));
  const kanbanLanes = ref(initialLanes);

  // ★重要：更新衝突を防ぐためのフラグ
  const isLocalUpdate = ref(false);

  // tasksが変わったらレーンを再構築する
  watch(() => props.tasks, updateKanbanLanes, { immediate: true, deep: true });

  function updateKanbanLanes() {
    if (isLocalUpdate.value) {
      isLocalUpdate.value = false;
      return;
    }

    const tempObj = {};
    statusOptions.forEach((status) => {
      tempObj[status] = [];
    });

    props.tasks?.forEach((task) => {
      if (tempObj[task.status]) {
        tempObj[task.status].push(task);
      }
    });

    kanbanLanes.value = tempObj;
  }

  const onTaskDrop = (event, newStatus) => {
    const movedTask = kanbanLanes.value[newStatus]?.[event.newIndex];

    if (movedTask) {
      isLocalUpdate.value = true;

      movedTask.status = newStatus;

      emit('update-status', {
        taskId: movedTask.id,
        newStatus: newStatus,
      });
    }
  };

  const openDialog = (task) => emit('open-dialog', task);
  const openInNewTab = (task) => emit('open-new-tab', task);
</script>

<template>
  <v-row
    class="flex-nowrap justify-center overflow-x-auto"
    style="min-height: 70vh"
  >
    <v-col
      v-for="status in statusOptions"
      :key="status"
      class="d-flex flex-column"
      style="min-width: 320px; max-width: 450px"
    >
      <!-- ヘッダー -->
      <div class="d-flex align-center mb-3 px-1">
        <v-badge
          dot
          :color="getStatusColor(status)"
          location="bottom end"
          offset-x="3"
          offset-y="3"
          class="mr-3"
        >
          <v-avatar
            size="32"
            color="surface-variant"
            variant="flat"
          >
            <span class="text-caption font-weight-bold">{{
              kanbanLanes[status]?.length || 0
            }}</span>
          </v-avatar>
        </v-badge>
        <h3 class="text-h6 font-weight-bold text-medium-emphasis">
          {{ status }}
        </h3>
      </div>

      <div
        class="bg-surfaceContainerHigh rounded-xl pa-3 fill-height flex-grow-1"
      >
        <VueDraggable
          v-model="kanbanLanes[status]"
          group="tasks"
          :animation="500"
          class="d-flex flex-column ga-3 drag-container"
          ghost-class="ghost"
          @add="(event) => onTaskDrop(event, status)"
          @update="(event) => onTaskDrop(event, status)"
        >
          <v-card
            v-for="task in kanbanLanes[status]"
            :key="task.id"
            class="rounded-lg border-none"
            elevation="1"
            link
          >
            <div class="pa-4">
              <div class="d-flex align-start justify-space-between mb-1">
                <div
                  class="text-subtitle-1 font-weight-bold mr-2 text-truncate"
                  style="line-height: 1.3"
                >
                  {{ task.title }}
                </div>
                <div
                  class="d-flex align-center ga-1"
                  style="margin-top: -8px; margin-right: -8px"
                >
                  <v-btn
                    icon="mdi-eye"
                    variant="text"
                    density="compact"
                    color="medium-emphasis"
                    size="small"
                    class="cursor-pointer"
                    @click.stop="openDialog(task)"
                  ></v-btn>
                  <v-btn
                    icon="mdi-open-in-new"
                    variant="text"
                    density="compact"
                    color="medium-emphasis"
                    size="small"
                    class="cursor-pointer"
                    @click.stop="openInNewTab(task)"
                  ></v-btn>
                </div>
              </div>
              <div class="text-caption text-medium-emphasis mb-3 text-truncate">
                {{ task.description }}
              </div>
              <div class="d-flex align-center justify-space-between mt-2">
                <div class="d-flex align-center">
                  <v-chip
                    :color="getPriorityColor(task.priority)"
                    size="x-small"
                    variant="outlined"
                    class="mr-2"
                  >
                    {{ task.priority }}
                  </v-chip>
                  <span
                    class="text-caption text-medium-emphasis d-flex align-center"
                  >
                    <v-icon
                      size="x-small"
                      start
                      class="mr-1"
                      >mdi-calendar</v-icon
                    >
                    {{ task.dueDate.slice(5) }}
                  </span>
                </div>
                <v-tooltip
                  :text="task.assignee"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-avatar
                      v-bind="props"
                      size="24"
                      color="primary"
                      class="text-caption text-white cursor-pointer"
                    >
                      {{ task.assignee.charAt(0) }}
                    </v-avatar>
                  </template>
                </v-tooltip>
              </div>
            </div>
          </v-card>
        </VueDraggable>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer !important;
  }
  .cursor-move {
    cursor: grab;
  }
  .drag-container {
    min-height: 500px;
  }
  .ghost {
    background: rgba(var(--v-theme-primary), 0.1);
  }
  .sortable-ghost,
  .sortable-drag,
  .sortable-chosen {
    transition: none !important;
  }
</style>
