"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.token) {
            // save token in localStorage
            localStorage.setItem("token", data.token);

            // also save token in cookie for middleware
            document.cookie = `token=${data.token}; path=/;`;

            router.push("/dashboard");
        } else {
            alert(data.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <form onSubmit={handleLogin} className="p-6 bg-gray-900 rounded-xl w-80">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
