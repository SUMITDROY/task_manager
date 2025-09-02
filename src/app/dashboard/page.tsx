"use client";

import { useState } from "react";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
        setInput("");
    };

    const toggleTask = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const editTask = (id: number, newText: string) => {
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

                {/* Add Task */}
                <form onSubmit={addTask} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a task..."
                        className="flex-1 p-2 rounded bg-gray-800 text-white"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 px-4 rounded"
                    >
                        Add
                    </button>
                </form>

                {/* Task List */}
                <ul className="space-y-2">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between bg-gray-800 p-2 rounded"
                        >
                            <div
                                onClick={() => toggleTask(task.id)}
                                className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-400" : ""
                                    }`}
                            >
                                {task.text}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const newText = prompt("Edit Task:", task.text);
                                        if (newText) editTask(task.id, newText);
                                    }}
                                    className="text-yellow-400 hover:text-yellow-500"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
