import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask, updateTask } from '../services/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState({ titulo: '', descripcion: '' });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (err) {
                setError('Error fetching tasks');
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, []);

    const handleCreateTask = async () => {
        try {
            const createdTask = await createTask(newTask);
            setTasks([...tasks, createdTask]);
            setNewTask({ titulo: '', descripcion: '' });
        } catch (err) {
            setError('Error creating task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            setError('Error deleting task');
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleUpdateTask = async () => {
        try {
            const updatedTask = await updateTask(editingTask._id, editingTask);
            setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
            setEditingTask(null);
        } catch (err) {
            setError('Error updating task');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <h3>{task.titulo}</h3>
                        <p>{task.descripcion}</p>
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        <button onClick={() => handleEditTask(task)}>Edit</button>
                    </li>
                ))}
            </ul>
            <div>
                <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={editingTask ? editingTask.titulo : newTask.titulo}
                    onChange={(e) => {
                        const value = e.target.value;
                        editingTask
                            ? setEditingTask({ ...editingTask, titulo: value })
                            : setNewTask({ ...newTask, titulo: value });
                    }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={editingTask ? editingTask.descripcion : newTask.descripcion}
                    onChange={(e) => {
                        const value = e.target.value;
                        editingTask
                            ? setEditingTask({ ...editingTask, descripcion: value })
                            : setNewTask({ ...newTask, descripcion: value });
                    }}
                />
                <button onClick={editingTask ? handleUpdateTask : handleCreateTask}>
                    {editingTask ? 'Update Task' : 'Create Task'}
                </button>
            </div>
        </div>
    );
};

export default TaskList;