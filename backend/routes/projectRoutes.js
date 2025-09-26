const express = require('express');
const router = express.Router();
const storage = require('../data/storage');

// GET /api/projects
router.get('/', (req, res) => {
  res.json(storage.projects);
});

// POST /api/projects
router.post('/', (req, res) => {
  const project = {
    id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
    name: req.body.name,
    color: req.body.color || '#6B7280'
  };
  storage.projects.push(project);
  res.json(project);
});

module.exports = router;