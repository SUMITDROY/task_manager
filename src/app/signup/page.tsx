"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            // save token in localStorage + cookie
            localStorage.setItem("token", data.token);
            document.cookie = `token=${data.token}; path=/;`;

            // ✅ redirect to dashboard
            router.push("/dashboard");
        } else {
            alert(data.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Signup</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <Input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
 