<script setup>
  import { statusOptions, getStatusColor, getPriorityColor } from '../utils/taskUtils';

  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
      default: () => [],
    },
  });

  // 親にイベントを通知する定義
  const emit = defineEmits(['open-dialog', 'open-new-tab']);

  // --- Kanban用フィルタリング ---
  // props.tasks を使ってフィルタリングします
  const getTasksByStatus = (status) => {
    return props.tasks.filter((task) => task.status === status);
  };

  // --- アクション (親にemitする) ---
  const onOpenDialog = (task) => {
    emit('open-dialog', task);
  };

  const onOpenNewTab = (task) => {
    emit('open-new-tab', task);
  };
</script>

<template>
  <v-row class="fill-height" style="min-height: 70vh">
    <!-- ステータスカラムループ -->
    <v-col
      v-for="status in statusOptions"
      :key="status"
      cols="12"
      md="4"
      class="d-flex flex-column"
    >
      <!-- カラムヘッダー -->
      <div class="d-flex align-center mb-3 px-1">
        <v-badge
          dot
          :color="getStatusColor(status)"
          location="bottom end"
          offset-x="3"
          offset-y="3"
          class="mr-3"
        >
          <v-avatar size="32" color="surface-variant" variant="flat">
            <span class="text-caption font-weight-bold">{{ getTasksByStatus(status).length }}</span>
          </v-avatar>
        </v-badge>
        <h3 class="text-h6 font-weight-bold text-medium-emphasis">{{ status }}</h3>
      </div>

      <!-- カラムエリア (ここに将来vuedraggableが入ります) -->
      <div class="kanban-column rounded-xl px-3 py-3 fill-height flex-grow-1">
        <!-- カードループ -->
        <v-card
          v-for="task in getTasksByStatus(status)"
          :key="task.id"
          class="mb-3 rounded-lg hover-card border-none"
          elevation="1"
          @click="openDialog(task)"
        >
          <div class="pa-4">
            <!-- 上段: タイトルとアクションボタン -->
            <div class="d-flex align-start justify-space-between mb-1">
              <div
                class="text-subtitle-1 font-weight-bold mr-2 text-truncate"
                style="line-height: 1.3"
              >
                {{ task.title }}
              </div>

              <!-- 右上ボタン (@click.stop でカードクリックを防止) -->
              <div class="d-flex align-start" style="margin-top: -4px; margin-right: -8px">
                <v-btn
                  icon="mdi-eye"
                  variant="text"
                  density="compact"
                  color="medium-emphasis"
                  size="small"
                  class="mr-1 cursor-pointer"
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

            <!-- 説明 -->
            <div class="text-caption text-medium-emphasis mb-3 text-truncate">
              {{ task.description }}
            </div>

            <!-- 下段情報 -->
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
                <span class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" start class="mr-1">mdi-calendar</v-icon>
                  {{ task.dueDate.slice(5) }}
                </span>
              </div>
              <v-tooltip :text="task.assignee" location="top">
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
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
  /* Kanban専用スタイルだけ持ってくる */
  .kanban-column {
    background-color: rgba(var(--v-theme-on-surface), 0.04);
    border: 1px dashed rgba(var(--v-theme-on-surface), 0.1);
  }

  .hover-card {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    cursor: pointer;
  }
  .hover-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }

  .cursor-pointer {
    cursor: pointer !important;
  }
</style>
