const Todo = require("../models/todoModel");

// Get all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
        const todo = new Todo({ title, description });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a todo
const updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };