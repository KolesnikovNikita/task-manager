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
        <div className="bg-slate-600 min-h-screen pt-6 flex flex-col">
            <h1 className="text-center mb-2 text-white font-bold text-xl">Менеджер задач</h1>
            <TaskForm taskToEdit={taskToEdit} onCancelEdit={handleCancelEdit} />
            <TaskList onEditTask={handleEditTask} />
        </div>
    );
};

export default HomePage;
