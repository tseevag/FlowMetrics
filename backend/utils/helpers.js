const getCurrentDate = () => new Date().toISOString();

const generateId = (counter) => counter().toString();

const filterTasks = (tasks, filters) => {
  const { project, category, status, priority, search } = filters;
  let filtered = [...tasks];

  if (project) filtered = filtered.filter(t => t.projectId === project);
  if (category) filtered = filtered.filter(t => t.categoryId === category);
  if (status) filtered = filtered.filter(t => t.status === status);
  if (priority) filtered = filtered.filter(t => t.priority === priority);
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(searchLower) || 
      t.description.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

const createTaskObject = (data, id) => ({
  id,
  title: data.title,
  description: data.description || '',
  projectId: data.projectId,
  categoryId: data.categoryId,
  priority: data.priority || 'medium',
  status: 'todo',
  dueDate: data.dueDate,
  estimatedTime: data.estimatedTime || 0,
  actualTime: 0,
  tags: data.tags || [],
  subtasks: data.subtasks || [],
  createdAt: getCurrentDate(),
  updatedAt: getCurrentDate(),
  completedAt: null,
  timeSpent: [],
  notes: []
});

module.exports = {
  getCurrentDate,
  generateId,
  filterTasks,
  createTaskObject
};