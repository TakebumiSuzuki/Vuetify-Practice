export const statusOptions = ['未着手', '進行中', '完了'];
export const priorityOptions = ['高', '中', '低'];

export const headers = [
  { title: 'タスク', key: 'title', sortable: true, width: '250px' },
  { title: '説明', key: 'description', sortable: false, width: '300px' },
  {
    title: 'ステータス',
    key: 'status',
    sortable: true,
    width: '130px',
  },
  { title: '優先度', key: 'priority', sortable: true, width: '100px' },
  { title: '進捗', key: 'progress', sortable: true },
  { title: '担当者名', key: 'assignee', sortable: true, width: '120px' },
  { title: '期限', key: 'dueDate', sortable: true, width: '120px' },
  { title: '操作', key: 'actions', sortable: false, align: 'end', width: '120px' },
];

// ヘルパー関数
export const getStatusColor = (status) => {
  const colors = { 完了: 'success', 進行中: 'primary', 未着手: 'grey' };
  return colors[status] || 'grey';
};

export const getPriorityColor = (priority) => {
  const colors = { 高: 'error', 中: 'warning', 低: 'info' };
  return colors[priority] || 'grey';
};

export const getProgressColor = (progress) => {
  if (progress >= 80) return 'success';
  if (progress >= 50) return 'primary';
  if (progress >= 30) return 'warning';
  return 'grey';
};
