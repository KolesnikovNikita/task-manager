import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Task } from '../models/Task';

interface TaskFormProps {
    taskToEdit?: Task | null;
    onCancelEdit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onCancelEdit }) => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        throw new Error('Контекст задач не найден');
    }

    const { addTask, updateTask } = taskContext;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setFile(taskToEdit.file || null);
        } else {
            setTitle('');
            setDescription('');
            setFile(null);
        }
    }, [taskToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Название задачи не может быть пустым.');
            return;
        }

        const newTask: Task = {
            id: taskToEdit ? taskToEdit.id : Date.now().toString(),
            title,
            description,
            completed: taskToEdit ? taskToEdit.completed : false,
            file: file || undefined,
        };

        if (taskToEdit) {
            updateTask(newTask);
            onCancelEdit?.();
        } else {
            addTask(newTask);
        }

        setTitle('');
        setDescription('');
        setFile(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название задачи:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Описание задачи:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Прикрепить файл:</label>
                <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <div>
                <button type="submit">{taskToEdit ? 'Обновить задачу' : 'Добавить задачу'}</button>
                {taskToEdit && onCancelEdit && (
                    <button type="button" onClick={onCancelEdit}>
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
