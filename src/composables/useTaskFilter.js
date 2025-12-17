import { computed } from 'vue';

export const useTaskFilter = (initialTasks, searchQuery) => {

  
  const filteredTasks = computed(() => {

    if (!searchQuery.value) return initialTasks.value;

    const searchLower = searchQuery.value.toLowerCase();

    return initialTasks.value.filter((task) => {
      // 全てのフィールドを検索対象にする
      return (
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        task.status.toLowerCase().includes(searchLower) ||
        task.priority.toLowerCase().includes(searchLower) ||
        task.assignee.toLowerCase().includes(searchLower) ||
        task.dueDate.includes(searchLower)
      );
    });

  });



  return { filteredTasks };
};
