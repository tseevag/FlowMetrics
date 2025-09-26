export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

export const formatTime = (hours) => {
  if (hours === 0) return '0h';
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  return `${hours}h`;
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: '#3B82F6',
    medium: '#F59E0B',
    high: '#EF4444',
    urgent: '#DC2626'
  };
  return colors[priority] || colors.medium;
};

export const getStatusColor = (status) => {
  const colors = {
    todo: '#6B7280',
    'in-progress': '#3B82F6',
    completed: '#10B981'
  };
  return colors[status] || colors.todo;
};

export const calculateCompletionRate = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'completed') return false;
  return new Date(dueDate) < new Date();
};