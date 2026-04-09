const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

// Todo Schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes

// GET /todos - Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort('-createdAt');
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /todos - Create a new todo
app.post('/todos', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const todo = new Todo({ title });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /todos/:id - Get a single todo
app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await Todo.findById(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        
        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;
        
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
