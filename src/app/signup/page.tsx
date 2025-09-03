"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserPlus, ArrowRight, Mail, Lock, User } from "lucide-react";

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

    const handleLogInRedirect = () => {
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 font-inter">
            <div className="w-full max-w-md mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                        <UserPlus className="w-8 h-8 text-white/90" />
                    </div>
                    <h1 className="text-3xl font-light text-white tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-white/50 text-sm font-light">
                        Join us and start your journey
                    </p>
                </div>

                {/* Main Card */}
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-xl font-light text-white text-center">
                            Sign Up
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSignup} className="space-y-5">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <Input
                                        placeholder="Full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-0 font-light h-12 pl-10"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <Input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-0 font-light h-12 pl-10"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:ring-0 font-light h-12 pl-10"
                                    />
                                </div>
                            </div>

                            {/* Sign Up Button */}
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-white/90 font-light h-12 transition-all duration-200 group"
                                disabled={!name.trim() || !email.trim() || !password.trim()}
                            >
                                <span>Create Account</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                        </form>

                        <div className="space-y-4">
                            <Separator className="bg-white/10" />

                            {/* Sign In Redirect */}
                            <div className="text-center space-y-3">
                                <p className="text-white/40 text-sm font-light">
                                    Already have an account?
                                </p>
                                <Button
                                    variant="ghost"
                                    onClick={handleLogInRedirect}
                                    className="text-white/70 hover:text-white hover:bg-white/5 font-light transition-all duration-200"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-white/20 text-xs font-light">
                        Secure and private by design
                    </p>
                </div>
            </div>
        </div>
    );
}