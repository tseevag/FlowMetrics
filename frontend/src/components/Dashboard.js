import React from 'react';
import { useApp } from '../context';
import './Dashboard.css';

const Dashboard = () => {
  const { state } = useApp();
  const { analytics, tasks } = state;
  
  if (!analytics) return <div>Loading...</div>;

  const recentTasks = tasks.slice(-5).reverse();
  const upcomingTasks = tasks
    .filter(t => t.dueDate && new Date(t.dueDate) > new Date() && t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{analytics.overview.totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-value">{analytics.overview.completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-value">{analytics.overview.pendingTasks}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card overdue">
          <div className="stat-value">{analytics.overview.overdueTasks}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Weekly Productivity</h3>
        <div className="productivity-chart">
          {analytics.productivity.map((day, index) => (
            <div key={index} className="chart-bar" style={{ height: `${Math.max(day.completed * 20, 4)}px` }}>
              <div className="chart-label">{day.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-container">
          <h3 className="chart-title">Recent Tasks</h3>
          {recentTasks.length > 0 ? (
            <div>
              {recentTasks.map(task => (
                <div key={task.id} className="task-summary">
                  <div className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
                    {task.title}
                  </div>
                  <div className="task-meta">
                    <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                    <span className={`status-badge status-${task.status}`}>{task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No recent tasks</h3>
              <p>Create your first task to get started</p>
            </div>
          )}
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Upcoming Deadlines</h3>
          {upcomingTasks.length > 0 ? (
            <div>
              {upcomingTasks.map(task => (
                <div key={task.id} className="task-summary">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No upcoming deadlines</h3>
              <p>You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;