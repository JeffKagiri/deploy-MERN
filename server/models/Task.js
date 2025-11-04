const mongoose = require('mongoose');

// Define Task schema for MongoDB
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Task title is mandatory
  },
  completed: {
    type: Boolean,
    default: false // Tasks start as incomplete
  }
}, { timestamps: true }); // Automatically add createdAt & updatedAt

// Export Task model to use in routes
module.exports = mongoose.model('Task', TaskSchema);
