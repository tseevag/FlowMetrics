import React, { useState, useEffect } from 'react';
import { useApp } from '../context';

const TaskList = ({ onEditTask }) => {
  const { state, actions } = useApp();
  const { tasks, projects, categories, filters } = state;
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    let filtered = [...tasks];

    if (filters.project) {
      filtered = filtered.filter(task => task.projectId === filters.project);
    }
    if (filters.category) {
      filtered = filtered.filter(task => task.categoryId === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)
      );
    }

    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'dueDate') {
        aVal = aVal ? new Date(aVal) : new Date('9999-12-31');
        bVal = bVal ? new Date(bVal) : new Date('9999-12-31');
      } else if (sortBy === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3, urgent: 4 };
        aVal = priorityOrder[aVal];
        bVal = priorityOrder[bVal];
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, filters, searchTerm, sortBy, sortOrder]);

  const handleStatusChange = (taskId, newStatus) => {
    actions.updateTask(taskId, { status: newStatus });
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div className="task-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Tasks ({filteredTasks.length})</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="task-filters">
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Project</label>
          <select 
            value={filters.project || ''} 
            onChange={(e) => actions.setFilters({...filters, project: e.target.value || undefined})}
            className="filter-select"
          >
            <option value="">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select 
            value={filters.category || ''} 
            onChange={(e) => actions.setFilters({...filters, category: e.target.value || undefined})}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select 
            value={filters.status || ''} 
            onChange={(e) => actions.setFilters({...filters, status: e.target.value || undefined})}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Priority</label>
          <select 
            value={filters.priority || ''} 
            onChange={(e) => actions.setFilters({...filters, priority: e.target.value || undefined})}
            className="filter-select"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="tasks-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={(e) => handleStatusChange(task.id, e.target.checked ? 'completed' : 'todo')}
                className="task-checkbox"
              />
              
              <div className="task-content">
                <div className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
                  {task.title}
                </div>
                {task.description && (
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    {task.description}
                  </div>
                )}
                <div className="task-meta">
                  <span>{getProjectName(task.projectId)}</span>
                  <span>{getCategoryName(task.categoryId)}</span>
                  <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  <span className={`status-badge status-${task.status}`}>{task.status}</span>
                  {task.dueDate && (
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                  {task.estimatedTime > 0 && (
                    <span>Est: {task.estimatedTime}h</span>
                  )}
                  {task.actualTime > 0 && (
                    <span>Actual: {task.actualTime}h</span>
                  )}
                </div>
              </div>

              <div className="task-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => onEditTask(task)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => actions.deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Try adjusting your filters or create a new task</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;