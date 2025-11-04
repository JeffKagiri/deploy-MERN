import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Store tasks
  const [newTask, setNewTask] = useState(''); // Store new task input

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data); // Update state
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []); // Fetch once on mount

  // Add a new task
  const addTask = async () => {
    if (!newTask) return;
    try {
      await axios.post('/api/tasks', { title: newTask });
      setNewTask('');
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  // Toggle task completion
  const toggleComplete = async (task) => {
    try {
      await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:'15px' }}>
        <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add new task..." />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task)}>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
