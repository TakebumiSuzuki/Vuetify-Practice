<script setup>
  import { ref, watch } from 'vue';
  import { VueDraggable } from 'vue-draggable-plus';
  import {
    statusOptions,
    getStatusColor,
    getPriorityColor,
  } from '../utils/taskUtils';

  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  // 親にイベントを通知する定義
  const emit = defineEmits(['open-dialog', 'open-new-tab']);

  // --- Kanban用フィルタリング ---
  // props.tasks を使ってフィルタリングします
  // const getTasksByStatus = (status) => {
  //   return props.tasks.filter((task) => task.status === status);
  // };

  // --- アクション (親にemitする) ---
  const openDialog = (task) => {
    emit('open-dialog', task);
  };

  const onOpenInNewTab = (task) => {
    emit('open-new-tab', task);
  };

  // 1. カラムごとのリストを管理する変数を作る
  const columns = ref({});

  // 2. props.tasks が来たら、カラムごとに振り分ける関数
  const distributeTasks = () => {
    // 初期化
    statusOptions.forEach((status) => {
      columns.value[status] = [];
    });

    // 振り分け
    props.tasks.forEach((task) => {
      if (columns.value[task.status]) {
        columns.value[task.status].push(task);
      }
    });
  };

  // 初期化とprops変更の監視
  watch(() => props.tasks, distributeTasks, { immediate: true });

  // 3. ドロップが終わった時に呼ばれるイベント（ステータス更新用）
  const onDrop = (event, newStatus) => {
    // ここで、移動したタスクのステータスを書き換えて親に通知する処理が必要になります
    // カンバンの実装で一番難しい部分です
    // 簡易的には、columnsの中身をすべて結合して親に返すなどします
  };
</script>

<template>
  <v-container>
    <h3>2. Inset（トグルスタイル）</h3>
    <!-- insetを付けるとカプセル型のようなデザインになります -->
    <v-switch
      disabled
      inset
      color="primary"
      loading="primary"
      class="static-switch"
    ></v-switch>

    <h3>3. ローディング状態</h3>
    <!-- 非同期処理中などに便利です -->
    <v-switch
      loading="warning"
      inset
    ></v-switch>
  </v-container>

  <v-row
    class="h-100 flex-nowrap justify-center overflow-x-auto"
    style="min-height: 70vh"
  >
    <!-- ステータスカラムループ -->
    <v-col
      v-for="status in statusOptions"
      :key="status"
      class="d-flex flex-column"
      style="min-width: 320px; max-width: 450px"
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
          <v-avatar
            size="32"
            color="surface-variant"
            variant="flat"
          >
            <span class="text-caption font-weight-bold">{{
              columns[status]?.length || 0
            }}</span>
          </v-avatar>
        </v-badge>
        <h3 class="text-h6 font-weight-bold text-medium-emphasis">
          {{ status }}
        </h3>
      </div>

      <!-- カラムエリア (ここに将来vuedraggableが入ります) -->
      <div
        class="bg-surfaceVariant rounded-xl px-3 py-3 fill-height flex-grow-1"
      >
        <VueDraggable
          v-model="columns[status]"
          group="tasks"
          :animation="500"
          class="d-flex flex-column ga-3 drag-container"
          ghost-class="ghost"
          @end="(e) => onDrop(e, status)"
        >
          <!-- カードループ -->
          <v-card
            v-for="task in columns[status]"
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
                <div
                  class="d-flex align-start"
                  style="margin-top: -4px; margin-right: -8px"
                >
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
  .static-switch :deep(.v-switch__thumb) {
    transform: scale(1) !important;
  }
  /* Kanban専用スタイルだけ持ってくる */
  .kanban-column {
    background-color: rgba(var(--v-theme-on-surface), 0.04);
    border: 1px dashed rgba(var(--v-theme-on-surface), 0.1);
  }

  .hover-card {
    /* transition:
      transform 0.2s ease,
      box-shadow 0.2s ease; */
    cursor: pointer;
  }
  .hover-card:hover {
    /* transform: translateY(-4px); */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }

  .cursor-pointer {
    cursor: pointer !important;
  }
  /*重要：リストが空になった時でもドロップできるように、
    ドラッグエリアには必ず「最小の高さ(min-height)」を持たせます。
  */
  .drag-container {
    min-height: 100px;
  }

  .ghost {
    opacity: 0.4;
    background: #c8ebfb; /* ドロップ先のガイド色 */
    border: 2px dashed #1976d2;
  }

  .cursor-move {
    cursor: grab;
  }
  /* 追加: ドラッグ中やアニメーション中は transition を無効にする */
  /* VueDraggable (Sortable.js) が付与するクラスを利用 */
  .sortable-ghost,
  .sortable-drag,
  .sortable-chosen {
    transition: none !important;
  }

  /* これも念のため追加：VueDraggable内のアイテムすべてに対して、
     ドラッグ操作による移動中はCSSアニメーションをオフにする */
  .drag-container > * {
    /* transformのアニメーションはライブラリ(JS)に任せる */
    /* ホバーエフェクト用のtransitionと競合しないようにする */
  }
</style>
