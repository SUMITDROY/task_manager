"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (

        <div className="min-h-screen w-full bg-black relative">
            {/* Midnight Mist */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
        `,
                }}
            />
            <div className="relative z-10 flex min-h-screen text-white">
                {/* Sidebar (placeholder for now) */}
                {/* <aside className="w-64 bg-gray-900 p-4">Sidebar Content</aside> */}

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Topbar */}
                    <header className="flex justify-between items-center p-4 shadow-lg">
                        <h2 className="text-lg font-semibold">Task Manager</h2>
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
        </div>         
    );
}



