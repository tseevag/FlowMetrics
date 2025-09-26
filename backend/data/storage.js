// In-memory storage (replace with database in production)
let tasks = [];
let projects = [
  { id: 'personal', name: 'Personal', color: '#3B82F6' },
  { id: 'work', name: 'Work', color: '#10B981' },
  { id: 'health', name: 'Health', color: '#F59E0B' }
];
let categories = [
  { id: 'urgent', name: 'Urgent', color: '#EF4444' },
  { id: 'important', name: 'Important', color: '#F59E0B' },
  { id: 'routine', name: 'Routine', color: '#6B7280' }
];
let taskIdCounter = 1;

module.exports = {
  tasks,
  projects,
  categories,
  taskIdCounter: () => taskIdCounter++
};