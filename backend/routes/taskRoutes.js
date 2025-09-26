const express = require('express');
const router = express.Router();
const storage = require('../data/storage');
const { getCurrentDate, generateId, filterTasks, createTaskObject } = require('../utils/helpers');

// GET /api/tasks
router.get('/', (req, res) => {
  const filteredTasks = filterTasks(storage.tasks, req.query);
  res.json(filteredTasks);
});

// POST /api/tasks
router.post('/', (req, res) => {
  const task = createTaskObject(req.body, generateId(storage.taskIdCounter));
  storage.tasks.push(task);
  res.json(task);
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const taskIndex = storage.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

  const task = storage.tasks[taskIndex];
  const updates = { ...req.body, updatedAt: getCurrentDate() };
  
  if (updates.status === 'completed' && task.status !== 'completed') {
    updates.completedAt = getCurrentDate();
  }
  
  storage.tasks[taskIndex] = { ...task, ...updates };
  res.json(storage.tasks[taskIndex]);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const taskIndex = storage.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  
  storage.tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted' });
});

// POST /api/tasks/:id/time
router.post('/:id/time', (req, res) => {
  const task = storage.tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const timeEntry = {
    id: Date.now().toString(),
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    duration: req.body.duration,
    note: req.body.note || ''
  };
  
  task.timeSpent.push(timeEntry);
  task.actualTime += req.body.duration;
  task.updatedAt = getCurrentDate();
  
  res.json(task);
});

module.exports = router;