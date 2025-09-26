const express = require('express');
const router = express.Router();
const storage = require('../data/storage');

// GET /api/categories
router.get('/', (req, res) => {
  res.json(storage.categories);
});

// POST /api/categories
router.post('/', (req, res) => {
  const category = {
    id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
    name: req.body.name,
    color: req.body.color || '#6B7280'
  };
  storage.categories.push(category);
  res.json(category);
});

module.exports = router;