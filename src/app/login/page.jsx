"use client";

import Link from "next/link";
import {
    Card,
    CardHeader,
    TextField,
    InputGroup,
    Button,
    Label,
} from "@heroui/react";

import { Eye, EyeSlash, Envelope, ShieldCheck } from "@gravity-ui/icons";
import { authClient, signIn } from "@/lib/auth-client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const { data, error: authError } = await signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (authError) {
                setError(authError.message || "Invalid credentials.");
                setIsLoading(false);
                return;
            }

            const userRole = data?.user?.role;
            const email = formData.email;

            if (email === "admin1@taskhive.com" || userRole === "admin") {
                router.push("/dashboard/admin");
            } else if (userRole === "freelancer") {
                router.push("/dashboard/freelancer");
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("Something went wrong. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 dark:bg-zinc-950">
            <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl border border-gray-100">
                <CardHeader className="flex flex-col gap-1 items-center justify-center pb-4">
                    <Link href="/" className="font-extrabold text-3xl text-cyan-600 tracking-tight">
                        SkillSwap
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-xs text-gray-500">Sign in to your SkillSwap account</p>
                </CardHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="bordered"
                        className="w-full border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-gray-700"
                    >
                        <FcGoogle size={18} /> Sign in with Google (Client)
                    </Button>

                    <div className="flex items-center my-1">
                        <hr className="flex-grow border-t border-gray-200" />
                        <span className="px-3 text-[11px] font-semibold uppercase text-gray-400">or email</span>
                        <hr className="flex-grow border-t border-gray-200" />
                    </div>

                    <TextField>
                        <Label className="text-xs font-semibold text-gray-700">Email Address</Label>
                        <InputGroup>
                            <InputGroup.Prefix><Envelope className="text-lg text-gray-400" /></InputGroup.Prefix>
                            <InputGroup.Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none text-xs p-2.5" />
                        </InputGroup>
                    </TextField>

                    <TextField>
                        <Label className="text-xs font-semibold text-gray-700">Password</Label>
                        <InputGroup>
                            <InputGroup.Prefix><ShieldCheck className="text-lg text-gray-400" /></InputGroup.Prefix>
                            <InputGroup.Input type={isVisible ? "text" : "password"} name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none text-xs p-2.5" />
                            <InputGroup.Suffix>
                                <button type="button" onClick={toggleVisibility}>{isVisible ? <EyeSlash className="text-lg text-gray-400" /> : <Eye className="text-lg text-gray-400" />}</button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </TextField>

                    {error && <div className="p-3 text-xs text-rose-600 bg-rose-50 rounded-xl font-medium">{error}</div>}

                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs py-3 rounded-xl transition" isLoading={isLoading}>
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    Don't have an account? <Link href="/register" className="text-cyan-600 hover:underline font-semibold">Register here</Link>
                </div>
            </Card>
        </div>
    );
}