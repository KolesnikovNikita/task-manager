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
        <form className="max-w-md mx-auto border-2 border-neutral-950 rounded-lg p-3 mb-4" onSubmit={handleSubmit}>
            <div>
                <label className="mr-2">Название задачи:</label>
                <input
                    type="text"
                    className="border-b-2 outline-0	"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label className="mr-2">Описание задачи:</label>
                <textarea
                    value={description}
                    className="resize-none"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="mr-2 ">Прикрепить файл:</label>
                <input
                    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
                    type="file"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                />
            </div>
            <div>
                <button className="border-4 border-indigo-500/75 p-1 " type="submit">
                    {taskToEdit ? 'Обновить задачу' : 'Добавить задачу'}
                </button>
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
