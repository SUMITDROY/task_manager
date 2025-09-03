"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle, Plus, Trash2, Target } from "lucide-react";

export default function App() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [newTask, setNewTask] = useState("");
    const [token] = useState("demo-token");

    const mockTasks = [
        { _id: "1", title: "Complete project documentation", completed: false },
        { _id: "2", title: "Review pull requests", completed: true },
        { _id: "3", title: "Plan next sprint", completed: false }
    ];

    useEffect(() => {
        if (!token) return;
        setTimeout(() => {
            setTasks(mockTasks);
        }, 500);
    }, [token]);

    const addTask = async () => {
        if (!newTask.trim()) return;

        const newTaskObj = {
            _id: Date.now().toString(),
            title: newTask,
            completed: false
        };

        setTasks([...tasks, newTaskObj]);
        setNewTask("");
    };

    const toggleTask = async (id: string) => {
        setTasks(tasks.map((t) =>
            t._id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTask = async (id: string) => {
        setTasks(tasks.filter((t) => t._id !== id));
    };

    const completedCount = tasks.filter(task => task.completed).length;
    const totalCount = tasks.length;

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-6 font-inter">
            <div className="w-full max-w-lg mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                        <Target className="w-8 h-8 text-white/90" />
                    </div>
                    <h1 className="text-3xl font-light text-white tracking-tight">
                        Focus
                    </h1>
                    <p className="text-white/50 text-sm font-light">
                        Clarity through simplicity
                    </p>
                </div>

                {/* Stats */}
                {totalCount > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="bg-white/[0.02] border-white/10 hover:bg-white/[0.04] transition-colors">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-light text-white">{totalCount}</div>
                                <div className="text-xs text-white/40 font-light uppercase tracking-wider">Total</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/[0.02] border-white/10 hover:bg-white/[0.04] transition-colors">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-light text-emerald-400">{completedCount}</div>
                                <div className="text-xs text-white/40 font-light uppercase tracking-wider">Done</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/[0.02] border-white/10 hover:bg-white/[0.04] transition-colors">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-light text-white">{totalCount - completedCount}</div>
                                <div className="text-xs text-white/40 font-light uppercase tracking-wider">Left</div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Main Card */}
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-light text-white">
                                Tasks
                            </CardTitle>
                            {totalCount > 0 && (
                                <Badge
                                    variant="outline"
                                    className="bg-white/5 text-white/70 border-white/20 font-light"
                                >
                                    {completedCount} of {totalCount}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Add Task */}
                        <div className="flex gap-3">
                            <Input
                                placeholder="What needs to be done?"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-0 font-light h-12"
                            />
                            <Button
                                onClick={addTask}
                                disabled={!newTask.trim()}
                                size="sm"
                                className="bg-white text-black hover:bg-white/90 disabled:bg-white/10 disabled:text-white/30 font-light h-12 px-6 min-w-[80px]"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        {totalCount > 0 && <Separator className="bg-white/10" />}

                        {/* Task List */}
                        <div className="space-y-2">
                            {tasks.length === 0 ? (
                                <div className="text-center py-12 space-y-3">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                                        <Circle className="w-6 h-6 text-white/30" />
                                    </div>
                                    <p className="text-white/40 font-light">No tasks yet</p>
                                    <p className="text-white/20 text-sm font-light">Add one above to get started</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {tasks.map((task, index) => (
                                        <div
                                            key={task._id}
                                            className="group flex items-center gap-4 p-4 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-200"
                                            style={{
                                                animationDelay: `${index * 50}ms`,
                                                animation: 'fadeInUp 0.3s ease-out forwards'
                                            }}
                                        >
                                            <button
                                                onClick={() => toggleTask(task._id)}
                                                className="flex-shrink-0 transition-transform hover:scale-110 duration-200"
                                            >
                                                {task.completed ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                                ) : (
                                                    <Circle className="w-5 h-5 text-white/40 hover:text-white/70" />
                                                )}
                                            </button>

                                            <span
                                                onClick={() => toggleTask(task._id)}
                                                className={`flex-1 cursor-pointer font-light transition-all duration-200 ${task.completed
                                                        ? "line-through text-white/30"
                                                        : "text-white/90"
                                                    }`}
                                            >
                                                {task.title}
                                            </span>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteTask(task._id)}
                                                className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0 transition-all duration-200"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Progress */}
                        {totalCount > 0 && (
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/40 font-light">Progress</span>
                                    <span className="text-white/60 font-light">
                                        {Math.round((completedCount / totalCount) * 100)}%
                                    </span>
                                </div>
                                <div className="relative w-full bg-white/5 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${(completedCount / totalCount) * 100}%` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                                </div>
                                {completedCount === totalCount && totalCount > 0 && (
                                    <div className="text-center pt-2">
                                        <p className="text-emerald-400 text-sm font-light">All done! 🎉</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-white/20 text-xs font-light">
                        Built with love by SDR
                    </p>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}