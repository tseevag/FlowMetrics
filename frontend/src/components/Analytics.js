import React from 'react';
import { useApp } from '../context';

const Analytics = () => {
  const { state } = useApp();
  const { analytics } = state;
  
  if (!analytics) return <div>Loading analytics...</div>;

  return (
    <div className="analytics">
      <h2>Analytics & Insights</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{analytics.overview.completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analytics.timeStats.totalTimeSpent}h</div>
          <div className="stat-label">Total Time Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analytics.timeStats.avgCompletionTime}</div>
          <div className="stat-label">Avg Days to Complete</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{analytics.dailyStats.today}</div>
          <div className="stat-label">Completed Today</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="chart-container">
          <h3 className="chart-title">Weekly Productivity</h3>
          <div className="productivity-chart">
            {analytics.productivity.map((day, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div 
                  className="chart-bar" 
                  style={{ 
                    height: `${Math.max(day.completed * 20, 4)}px`,
                    backgroundColor: day.completed > 0 ? '#10b981' : '#e5e7eb'
                  }}
                  title={`${day.completed} tasks completed`}
                />
                <div className="chart-label">{day.day}</div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  {day.completed}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Tasks by Priority</h3>
          <div style={{ padding: '1rem 0' }}>
            {analytics.tasksByPriority.map(item => (
              <div key={item.priority} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.75rem 0',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`priority-badge priority-${item.priority}`}>
                    {item.priority}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                  <span>Total: {item.total}</span>
                  <span style={{ color: '#10b981' }}>Done: {item.completed}</span>
                  <span style={{ color: '#f59e0b' }}>Pending: {item.total - item.completed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Project Progress</h3>
        <div style={{ padding: '1rem 0' }}>
          {analytics.tasksByProject.map(project => {
            const completionRate = project.total > 0 ? (project.completed / project.total * 100).toFixed(1) : 0;
            return (
              <div key={project.id} style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div 
                      style={{ 
                        width: '12px', 
                        height: '12px', 
                        borderRadius: '50%', 
                        backgroundColor: project.color 
                      }}
                    />
                    <span style={{ fontWeight: '500' }}>{project.name}</span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {project.completed}/{project.total} ({completionRate}%)
                  </div>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#f1f5f9', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div 
                    style={{ 
                      width: `${completionRate}%`, 
                      height: '100%', 
                      backgroundColor: project.color,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="chart-container">
          <h3 className="chart-title">Time Insights</h3>
          <div style={{ padding: '1rem 0' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Today's Focus Time
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                {analytics.timeStats.todayTimeSpent}h
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Average Completion Time
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                {analytics.timeStats.avgCompletionTime} days
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Total Productive Hours
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                {analytics.timeStats.totalTimeSpent}h
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Performance Summary</h3>
          <div style={{ padding: '1rem 0' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                This Week
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10b981' }}>
                {analytics.dailyStats.thisWeek} completed
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                This Month
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#3b82f6' }}>
                {analytics.dailyStats.thisMonth} completed
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Overdue Tasks
              </div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                color: analytics.overview.overdueTasks > 0 ? '#ef4444' : '#10b981'
              }}>
                {analytics.overview.overdueTasks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;