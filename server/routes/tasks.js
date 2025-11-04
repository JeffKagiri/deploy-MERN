const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import Task model

// GET /api/tasks - Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Get all tasks from DB
    res.json(tasks); // Return tasks as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks - Create new task
router.post('/', async (req, res) => {
  const task = new Task({ title: req.body.title }); // Create new task
  try {
    const newTask = await task.save(); // Save task to DB
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Update task fields if provided
    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    const updatedTask = await task.save(); // Save updated task
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.remove(); // Delete task
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
