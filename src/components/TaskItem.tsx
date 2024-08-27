import React, { useContext } from 'react';
import { Task } from '../models/Task';
import { TaskContext } from '../context/TaskContext';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        throw new Error('Контекст задач не найден');
    }

    const { updateTask, deleteTask } = taskContext;

    const handleStatusChange = () => {
        const updatedTask = { ...task, completed: !task.completed };
        updateTask(updatedTask);
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    return (
        <tr>
            <td className="border border-slate-700 bg-slate-900 text-white px-2">{task.title}</td>
            <td className="border border-slate-700 bg-slate-900 text-white px-2">{task.description}</td>
            <td className="border border-slate-700 bg-slate-900 text-white px-2">
                <input type="checkbox" className="mr-2" checked={task.completed} onChange={handleStatusChange} />
                {task.completed ? 'Выполнено' : 'Не выполнено'}
            </td>
            <td className="border border-slate-700 bg-slate-900 text-white">
                {task.file ? <a href={URL.createObjectURL(task.file)}>Скачать файл</a> : 'Нет файла'}
            </td>
            <td className="border border-slate-700 bg-slate-900 text-white">
                <button className="border-2 p-1" onClick={() => onEdit(task)}>
                    Редактировать
                </button>
                <button className="border-2 p-1" onClick={handleDelete}>
                    Удалить
                </button>
            </td>
        </tr>
    );
};

export default TaskItem;
