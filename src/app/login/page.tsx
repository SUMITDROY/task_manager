"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogIn, ArrowRight, Mail, Lock, UserPlus } from "lucide-react";

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

    const handleSignUpRedirect = () => {
        router.push("/signup");
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 font-inter">
            <div className="w-full max-w-md mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                        <LogIn className="w-8 h-8 text-white/90" />
                    </div>
                    <h1 className="text-3xl font-light text-white tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-white/50 text-sm font-light">
                        Sign in to your account
                    </p>
                </div>

                {/* Main Card */}
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-xl font-light text-white text-center">
                            Login
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email Input */}
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

                            {/* Password Input */}
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

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-white/90 font-light h-12 transition-all duration-200 group"
                                disabled={!email.trim() || !password.trim()}
                            >
                                <span>Login</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                        </form>

                        <div className="space-y-4">
                            <Separator className="bg-white/10" />

                            {/* Sign Up Redirect */}
                            <div className="text-center space-y-3">
                                <p className="text-white/40 text-sm font-light">
                                    Don&apos;t have an account?
                                </p>
                                <Button
                                    variant="ghost"
                                    onClick={handleSignUpRedirect}
                                    className="text-white/70 hover:text-white hover:bg-white/5 font-light transition-all duration-200"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Create Account
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
