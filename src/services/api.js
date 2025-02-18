const API_URL = 'https://mongodb-api-repo.onrender.com';

export const fetchTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tareas`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch tasks failed:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Create task failed:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tareas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Delete task failed:', error);
        throw error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await fetch(`${API_URL}/tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Update task failed:', error);
        throw error;
    }
};