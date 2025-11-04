// Import required modules
const express = require('express');      // Express framework
const mongoose = require('mongoose');    // MongoDB object modeling
const cors = require('cors');            // Enable Cross-Origin Resource Sharing
const dotenv = require('dotenv');        // Load environment variables from .env
const path = require('path');            // Handle file paths

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());               // Allow requests from frontend
app.use(express.json());       // Parse JSON request bodies

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Import API routes
const tasksRouter = require('./routes/tasks');  // Ensure tasks.js exists

// Mount API routes at /api/tasks
app.use('/api/tasks', tasksRouter);

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from React build folder
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Fallback: handle any request not handled by API routes
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Set server port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
