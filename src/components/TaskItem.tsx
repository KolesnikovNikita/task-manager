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
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
                <input type="checkbox" checked={task.completed} onChange={handleStatusChange} />
                {task.completed ? 'Выполнено' : 'Не выполнено'}
            </td>
            <td>{task.file ? <a href={URL.createObjectURL(task.file)}>Скачать файл</a> : 'Нет файла'}</td>
            <td>
                <button onClick={() => onEdit(task)}>Редактировать</button>
                <button onClick={handleDelete}>Удалить</button>
            </td>
        </tr>
    );
};

export default TaskItem;
