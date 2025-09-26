export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: '#3B82F6' },
  { value: 'medium', label: 'Medium', color: '#F59E0B' },
  { value: 'high', label: 'High', color: '#EF4444' },
  { value: 'urgent', label: 'Urgent', color: '#DC2626' }
];

export const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do', color: '#6B7280' },
  { value: 'in-progress', label: 'In Progress', color: '#3B82F6' },
  { value: 'completed', label: 'Completed', color: '#10B981' }
];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' }
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'tasks', label: 'Tasks', icon: '✓' },
  { id: 'analytics', label: 'Analytics', icon: '📈' }
];