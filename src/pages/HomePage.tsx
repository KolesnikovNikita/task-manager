import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Task } from '../models/Task';

const HomePage: React.FC = () => {
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
    };

    const handleCancelEdit = () => {
        setTaskToEdit(null);
    };

    return (
        <div>
            <h1>Менеджер задач</h1>
            <TaskForm taskToEdit={taskToEdit} onCancelEdit={handleCancelEdit} />
            <TaskList onEditTask={handleEditTask} />
        </div>
    );
};

export default HomePage;
