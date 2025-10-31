const express = require('express');
const router = express.Router();
const storage = require('../data/storage');
const { getCurrentDate, generateId, filterTasks, createTaskObject } = require('../utils/helpers');

// Input validation middleware
const validateTaskInput = (req, res, next) => {
  const { title, description } = req.body;
  if (title && typeof title !== 'string') {
    return res.status(400).json({ error: 'Title must be a string' });
  }
  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }
  next();
};

const validateTaskId = (req, res, next) => {
  const { id } = req.params;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  next();
};

// GET /api/tasks
router.get('/', (req, res) => {
  const filteredTasks = filterTasks(storage.tasks, req.query);
  res.json(filteredTasks);
});

// POST /api/tasks
router.post('/', validateTaskInput, (req, res) => {
  try {
    const task = createTaskObject(req.body, generateId(storage.taskIdCounter));
    storage.tasks.push(task);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Invalid task data' });
  }
});

// PUT /api/tasks/:id
router.put('/:id', validateTaskId, validateTaskInput, (req, res) => {
  try {
    const taskIndex = storage.tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    const task = storage.tasks[taskIndex];
    const updates = { ...req.body, updatedAt: getCurrentDate() };
    
    if (updates.status === 'completed' && task.status !== 'completed') {
      updates.completedAt = getCurrentDate();
    }
    
    storage.tasks[taskIndex] = { ...task, ...updates };
    res.json(storage.tasks[taskIndex]);
  } catch (error) {
    res.status(400).json({ error: 'Invalid update data' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', validateTaskId, (req, res) => {
  try {
    const taskIndex = storage.tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
    
    storage.tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// POST /api/tasks/:id/time
router.post('/:id/time', validateTaskId, (req, res) => {
  try {
    const task = storage.tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { startTime, endTime, duration, note } = req.body;
    if (typeof duration !== 'number' || duration < 0) {
      return res.status(400).json({ error: 'Invalid duration' });
    }

    const timeEntry = {
      id: Date.now().toString(),
      startTime,
      endTime,
      duration,
      note: note || ''
    };
    
    task.timeSpent.push(timeEntry);
    task.actualTime += duration;
    task.updatedAt = getCurrentDate();
    
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Invalid time entry data' });
  }
});

module.exports = router;