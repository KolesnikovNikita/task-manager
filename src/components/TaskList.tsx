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
        return <p className="text-red-500"> Ошибка: Контекст задач не найден.</p>;
    }

    const { tasks } = taskContext;

    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto">
                {tasks.length === 0 ? (
                    <p className="text-white text-center">Нет задач для отображения.</p>
                ) : (
                    <table className="border-collapse table-auto border mx-auto border-slate-500">
                        <thead>
                            <tr>
                                <th className="border bg-slate-700 text-gray-300	 border-slate-600">Описание</th>
                                <th className="border bg-slate-700 text-gray-300	 border-slate-600">Статус</th>
                                <th className="border bg-slate-700 text-gray-300	 border-slate-600">Название</th>
                                <th className="border bg-slate-700 text-gray-300	 border-slate-600">Файл</th>
                                <th className="border bg-slate-700 text-gray-300	 border-slate-600">Действия</th>
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
        </div>
    );
};

export default TaskList;
