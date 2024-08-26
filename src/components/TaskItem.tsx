import React from 'react';
import { Task } from '../models/Task';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
    return (
        <tr>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
                <input type="checkbox" checked={task.completed} readOnly />
                {task.completed ? 'Выполнено' : 'Не выполнено'}
            </td>
            <td>{task.file ? <a href={URL.createObjectURL(task.file)}>Скачать файл</a> : 'Нет файла'}</td>
            <td>
                <button onClick={() => onEdit(task)}>Редактировать</button>
            </td>
        </tr>
    );
};

export default TaskItem;
