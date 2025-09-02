"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 p-6 hidden md:flex flex-col">
                <h1 className="text-2xl font-bold mb-8">MyApp</h1>
                <nav className="space-y-4">
                    <a href="/dashboard" className="block hover:text-blue-400">Dashboard</a>
                    <a href="/dashboard/tasks" className="block hover:text-blue-400">Tasks</a>
                    <a href="/dashboard/settings" className="block hover:text-blue-400">Settings</a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="flex justify-between items-center bg-gray-800 p-4 shadow">
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </Button>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
