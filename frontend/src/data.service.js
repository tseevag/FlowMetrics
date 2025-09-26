import api from './api.service';

export const taskService = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/api/tasks?${params}`);
  },
  
  create: (taskData) => api.post('/api/tasks', taskData),
  
  update: (id, updates) => api.put(`/api/tasks/${id}`, updates),
  
  delete: (id) => api.delete(`/api/tasks/${id}`),
  
  addTimeEntry: (id, timeData) => api.post(`/api/tasks/${id}/time`, timeData)
};

export const projectService = {
  getAll: () => api.get('/api/projects'),
  create: (projectData) => api.post('/api/projects', projectData)
};

export const categoryService = {
  getAll: () => api.get('/api/categories'),
  create: (categoryData) => api.post('/api/categories', categoryData)
};

export const analyticsService = {
  get: () => api.get('/api/analytics')
};