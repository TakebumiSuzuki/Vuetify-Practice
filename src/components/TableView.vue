<script setup>
  import { ref, watch, onMounted } from 'vue';
  import {
    headers,
    statusOptions,
    priorityOptions,
    getStatusColor,
    getPriorityColor,
    getProgressColor,
  } from '../utils/taskUtils';

  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(['open-dialog', 'open-new-tab', 'update-status', 'update-priority']);

  // --- アニメーション制御 ---
  const rowVisibility = ref([]);

  const playAnimation = () => {
    if (!props.tasks) return;
    // 一旦非表示
    rowVisibility.value = new Array(props.tasks.length).fill(false);
    // 少し待ってから表示
    setTimeout(() => {
      rowVisibility.value = new Array(props.tasks.length).fill(true);
    }, 50);
  };

  // const filteredTasks = computed(() => ... ); この時点では filteredTasks は ref オブジェクト。しかし、
  // :tasks="filteredTasks" で props として渡される時に、テンプレートコンパイラにより、アンラップされている。
  // で、computed の中の filter メソッドは毎回新しい配列オブジェクトを作る。よって、第一引数に props.tasks
  // とだけ書くと、フィルターをした後、追跡が途絶える。
  watch(
    () => props.tasks,
    () => {
      playAnimation();
    },
  );

  // --- アクション用ラッパー ---
  const openDialog = (item) => emit('open-dialog', item);
  const openInNewTab = (item) => emit('open-new-tab', item);
  const updateStatus = (item, newStatus) => emit('update-status', item, newStatus);
  const updatePriority = (item, newPriority) => emit('update-priority', item, newPriority);
</script>

<template>
  <v-card class="rounded-lg">
    <!-- hover 機能: 行（tr）ではなく、中の**セル（td）**の色を変える仕様 -->
    <v-data-table
      :headers="headers"
      :items="props.tasks"
      :items-per-page="10"
      class="elevation-0 compact-table"
      hover
    >
      <!-- 行のカスタマイズ -->
      <template #item="{ item, index }">
        <tr
          class="table-row"
          :style="{
            opacity: rowVisibility[index] ? 1 : 0,
            transform: rowVisibility[index] ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.04}s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s, background-color 0.4s ease`,
          }"
        >
          <!-- タイトル -->
          <td>
            <span class="font-weight-bold text-body-1">{{ item.title }}</span>
          </td>

          <!-- 説明 -->
          <td class="text-medium-emphasis text-truncate" style="max-width: 200px">
            {{ item.description }}
          </td>

          <!-- ステータス (Dropdown) -->
          <td>
            <v-menu location="bottom start">
              <template #activator="{ props }">
                <v-chip
                  v-bind="props"
                  :color="getStatusColor(item.status)"
                  size="small"
                  class="font-weight-medium cursor-pointer"
                  link
                >
                  {{ item.status }}<v-icon end size="small">mdi-chevron-down</v-icon>
                </v-chip>
              </template>
              <v-list density="compact">
                <v-list-item
                  v-for="status in statusOptions"
                  :key="status"
                  @click="updateStatus(item, status)"
                >
                  <v-list-item-title>{{ status }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>

          <!-- 優先度 (Dropdown) -->
          <td>
            <v-menu location="bottom start">
              <template #activator="{ props }">
                <v-chip
                  v-bind="props"
                  :color="getPriorityColor(item.priority)"
                  size="small"
                  variant="outlined"
                  class="cursor-pointer"
                  link
                >
                  {{ item.priority }}<v-icon end size="small">mdi-chevron-down</v-icon>
                </v-chip>
              </template>
              <v-list density="compact">
                <v-list-item
                  v-for="priority in priorityOptions"
                  :key="priority"
                  @click="updatePriority(item, priority)"
                >
                  <v-list-item-title>{{ priority }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>

          <!-- 進捗 -->
          <td>
            <div class="d-flex align-center">
              <v-progress-linear
                :model-value="item.progress"
                :color="getProgressColor(item.progress)"
                height="8"
                rounded
                class="mr-2"
                style="min-width: 80px"
              ></v-progress-linear>
              <span class="text-caption">{{ item.progress }}%</span>
            </div>
          </td>

          <!-- 担当者 -->
          <td>{{ item.assignee }}</td>

          <!-- 期限 -->
          <td>{{ item.dueDate }}</td>

          <!-- アクションボタン -->
          <td class="text-center text-no-wrap">
            <v-btn
              icon="mdi-eye"
              variant="text"
              density="compact"
              color="medium-emphasis"
              class="mr-4 cursor-pointer"
              @click="openDialog(item)"
            ></v-btn>
            <v-btn
              icon="mdi-open-in-new"
              variant="text"
              density="compact"
              color="medium-emphasis"
              class="cursor-pointer"
              @click="openInNewTab(item)"
            ></v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer !important;
  }
  /* :deep(.v-data-table__th) {
    font-weight: 600 !important;
    background-color: rgb(var(--v-theme-surface)) !important;
  }
  :deep(.v-data-table__td) {
    padding: 12px 16px !important;
    height: 64px;
    vertical-align: middle;
  } */
  .compact-table > .v-table__wrapper > table > thead > tr > th,
  .compact-table > .v-table__wrapper > table > tbody > tr > td {
    padding-left: 10px;
    padding-right: 10px;
  }

</style>
