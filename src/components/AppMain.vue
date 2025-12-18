<script setup>
  import { ref, onMounted } from 'vue';
  import sampleTasks from './sampleData';
  import { useTaskFilter } from '../composables/useTaskFilter';

  import KanbanView from './KanbanView.vue';
  import TableView from './TableView.vue';
  import TaskDetailDialog from './TaskDetailDialog.vue';

  // --- 状態管理 ---
  const activeTab = ref('table');
  const searchQuery = ref('');
  const tasks = ref([]);

  // フィルタリングロジック (Composable)
  const { filteredTasks } = useTaskFilter(tasks, searchQuery);

  // ダイアログ制御用
  const showDialog = ref(false);
  const selectedTask = ref(null);

  // --- アクション ---
  const openInNewTab = (task) => {
    const url = `/tasks/${task.id}`;
    window.open(url, '_blank');
  };

  const openDialog = (task) => {
    selectedTask.value = task;
    showDialog.value = true;
  };

  // 子コンポーネントからの更新通知を受け取る関数
  // (オブジェクト参照で直接書き換える場合は、ここが空でも動きますが、明示的に用意しておくと安全です)
  const updateStatus = (item, newStatus) => {
    item.status = newStatus;
  };
  const updatePriority = (item, newPriority) => {
    item.priority = newPriority;
  };

  // --- ライフサイクル ---
  onMounted(() => {
    tasks.value = sampleTasks;
  });
</script>

<template>
  <v-container fluid class="px-6 pt-4 pb-6">

    <!-- 検索バー -->
    <v-toolbar flat class="px-4 bg-transparent rounded-lg">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        label="検索"
        single-line
        hide-details
        clearable
        variant="outlined"
        density="comfortable"
        class="mr-4"
        style="max-width: 400px"
      />
      <v-spacer></v-spacer>
        <v-tabs
          v-model="activeTab"
          color="primary"
          class="rounded-lg elevation-2 bg-surface"
          density="comfortable"
          height="44"
        >
          <v-tab value="table" variant="text"><v-icon start>mdi-view-list</v-icon></v-tab>
          <v-tab value="kanban"  variant="text"><v-icon start>mdi-view-column</v-icon></v-tab>
        </v-tabs>
    </v-toolbar>

    <!-- メインコンテンツ -->
    <v-window v-model="activeTab" class="mt-4">
      <v-window-item value="table">
        <TableView
          :tasks="filteredTasks"
          @open-dialog="openDialog"
          @open-new-tab="openInNewTab"
          @update-status="updateStatus"
          @update-priority="updatePriority"
        />
      </v-window-item>

      <v-window-item value="kanban" class="fill-height">
        <KanbanView
          :tasks="filteredTasks"
          @open-dialog="openDialog"
          @open-new-tab="openInNewTab"
        />
      </v-window-item>
    </v-window>

    <!-- 詳細ダイアログ (コンポーネント化) -->
    <TaskDetailDialog v-model="showDialog" :task="selectedTask" @open-new-tab="openInNewTab" />
  </v-container>
</template>
