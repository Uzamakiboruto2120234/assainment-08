import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/todoService";

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTodos = async () => {
        const res = await getTodos();
        setTodos(res.data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAdd = async () => {
        if (!title) return;
        const res = await createTodo({ title });
        setTodos([...todos, res.data]);
        setTitle("");
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    const handleToggleStatus = async (todo) => {
        const updated = await updateTodo(todo._id, {
            status: todo.status === "pending" ? "completed" : "pending"
        });
        setTodos(todos.map(t => t._id === todo._id ? updated.data : t));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task"/>
            <button onClick={handleAdd}>Add Task</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <span style={{ textDecoration: todo.status === "completed" ? "line-through" : "none" }}>
                            {todo.title}
                        </span>
                        <button onClick={() => handleToggleStatus(todo)}>Toggle Status</button>
                        <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;