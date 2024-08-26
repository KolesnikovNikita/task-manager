import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { Task } from '../models/Task';

interface TaskListProps {
    onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        return <p>Ошибка: Контекст задач не найден.</p>;
    }

    const { tasks } = taskContext;

    return (
        <div>
            <h2>Список задач</h2>
            {tasks.length === 0 ? (
                <p>Нет задач для отображения.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Статус</th>
                            <th>Файл</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} onEdit={onEditTask} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TaskList;
