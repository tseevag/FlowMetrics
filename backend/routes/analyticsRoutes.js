const express = require('express');
const router = express.Router();
const storage = require('../data/storage');

// GET /api/analytics
router.get('/', (req, res) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const completedTasks = storage.tasks.filter(t => t.status === 'completed');
  const todayCompleted = completedTasks.filter(t => new Date(t.completedAt) >= today);
  const weekCompleted = completedTasks.filter(t => new Date(t.completedAt) >= thisWeek);
  const monthCompleted = completedTasks.filter(t => new Date(t.completedAt) >= thisMonth);

  const overdueTasks = storage.tasks.filter(t => 
    t.status !== 'completed' && 
    t.dueDate && 
    new Date(t.dueDate) < now
  );

  const totalTimeSpent = storage.tasks.reduce((sum, task) => sum + task.actualTime, 0);
  const avgCompletionTime = completedTasks.length > 0 
    ? completedTasks.reduce((sum, task) => {
        const created = new Date(task.createdAt);
        const completed = new Date(task.completedAt);
        return sum + (completed - created);
      }, 0) / completedTasks.length / (1000 * 60 * 60 * 24)
    : 0;

  const productivityByDay = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(thisWeek.getTime() + (i * 24 * 60 * 60 * 1000));
    const dayCompleted = completedTasks.filter(t => {
      const completedDate = new Date(t.completedAt);
      return completedDate.toDateString() === date.toDateString();
    });
    return {
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      completed: dayCompleted.length,
      timeSpent: dayCompleted.reduce((sum, task) => sum + task.actualTime, 0)
    };
  });

  const tasksByProject = storage.projects.map(project => ({
    ...project,
    total: storage.tasks.filter(t => t.projectId === project.id).length,
    completed: storage.tasks.filter(t => t.projectId === project.id && t.status === 'completed').length,
    pending: storage.tasks.filter(t => t.projectId === project.id && t.status !== 'completed').length
  }));

  const tasksByPriority = ['low', 'medium', 'high', 'urgent'].map(priority => ({
    priority,
    total: storage.tasks.filter(t => t.priority === priority).length,
    completed: storage.tasks.filter(t => t.priority === priority && t.status === 'completed').length
  }));

  res.json({
    overview: {
      totalTasks: storage.tasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: storage.tasks.length - completedTasks.length,
      overdueTasks: overdueTasks.length,
      completionRate: storage.tasks.length > 0 ? (completedTasks.length / storage.tasks.length * 100).toFixed(1) : 0
    },
    timeStats: {
      totalTimeSpent: Math.round(totalTimeSpent),
      avgCompletionTime: Math.round(avgCompletionTime * 10) / 10,
      todayTimeSpent: todayCompleted.reduce((sum, task) => sum + task.actualTime, 0)
    },
    dailyStats: {
      today: todayCompleted.length,
      thisWeek: weekCompleted.length,
      thisMonth: monthCompleted.length
    },
    productivity: productivityByDay,
    tasksByProject,
    tasksByPriority
  });
});

module.exports = router;