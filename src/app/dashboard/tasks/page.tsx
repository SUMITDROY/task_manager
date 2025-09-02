"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    // ✅ Fetch tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/tasks", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTasks(data);
    };

    const addTask = async () => {
        if (!newTask.trim()) return;
        const token = localStorage.getItem("token");
        await fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: newTask }),
        });
        setNewTask("");
        fetchTasks();
    };

    const toggleTask = async (id: string, completed: boolean) => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ completed: !completed }),
        });
        fetchTasks();
    };

    const deleteTask = async (id: string) => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchTasks();
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Your Tasks ✅</h1>

            {/* Add Task */}
            <div className="flex gap-2">
                <Input
                    placeholder="Enter new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button onClick={addTask}>Add</Button>
            </div>

            {/* Task List */}
            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
                    >
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(task._id, task.completed)}
                            />
                            <span
                                className={`${task.completed ? "line-through text-gray-500" : ""
                                    }`}
                            >
                                {task.title}
                            </span>
                        </div>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
