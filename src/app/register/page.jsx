"use client";

import Link from "next/link";
import {
    Card,
    CardHeader,
    TextField,
    InputGroup,
    Button,
    Label,
    RadioGroup,
    Radio,
} from "@heroui/react";

import { Eye, EyeSlash, Person, Envelope, ShieldCheck, Link as LinkIcon } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
    const router = useRouter();
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const [role, setRole] = useState("client");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: "",
        password: "",
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validatePassword = (pass) => {
        if (pass.length < 6) return "Password must be at least 6 characters long.";
        if (!/[A-Z]/.test(pass)) return "Password must contain at least one capital letter.";
        if (!/[a-z]/.test(pass)) return "Password must contain at least one lowercase letter.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        const passError = validatePassword(formData.password);
        if (passError) {
            setError(passError);
            setIsLoading(false);
            return;
        }

        try {
            const { data, error: authError } = await signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                image: formData.image || "https://i.ibb.co.com/JWMz5JxF/da59647bd31dd524c09991cb89949804-1.jpg",
                role: role,
            });

            if (authError) {
                setError(authError.message || "Signup failed.");
                setIsLoading(false);
                return;
            }

            // Sync user to backend collection
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
            await axios.post(`${baseUrl}/api/users/sync`, {
                email: formData.email,
                name: formData.name,
                image: formData.image,
                role: role
            }).catch(console.error);

            setSuccess("Account created successfully!");
            setFormData({ name: "", email: "", image: "", password: "" });

            if (formData.email === "admin1@taskhive.com") {
                router.push("/dashboard/admin");
            } else if (role === "freelancer") {
                router.push("/dashboard/freelancer");
            } else {
                router.push("/dashboard/client");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            setError("Something went wrong. Please try again.");
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
                    <h1 className="text-xl font-bold text-gray-900">Create an Account</h1>
                    <p className="text-xs text-gray-500">Register to start hiring or freelancing</p>
                </CardHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label className="text-xs font-semibold text-gray-700">I want to register as a:</Label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="client"
                                    checked={role === "client"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="text-cyan-600 focus:ring-cyan-500"
                                />
                                Client (Post Tasks)
                            </label>
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="freelancer"
                                    checked={role === "freelancer"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="text-cyan-600 focus:ring-cyan-500"
                                />
                                Freelancer (Apply Tasks)
                            </label>
                        </div>
                    </div>

                    <Button
                        onClick={handleGoogleSignIn}
                        variant="bordered"
                        className="w-full border-gray-200 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-gray-700"
                    >
                        <FcGoogle size={18} /> Sign up with Google (Client)
                    </Button>

                    <div className="flex items-center my-1">
                        <hr className="flex-grow border-t border-gray-200" />
                        <span className="px-3 text-[11px] font-semibold uppercase text-gray-400">or email</span>
                        <hr className="flex-grow border-t border-gray-200" />
                    </div>

                    <TextField>
                        <Label className="text-xs font-semibold text-gray-700">Full Name</Label>
                        <InputGroup>
                            <InputGroup.Prefix><Person className="text-lg text-gray-400" /></InputGroup.Prefix>
                            <InputGroup.Input name="name" placeholder="Enter full name" value={formData.name} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none text-xs p-2.5" />
                        </InputGroup>
                    </TextField>

                    <TextField>
                        <Label className="text-xs font-semibold text-gray-700">Email Address</Label>
                        <InputGroup>
                            <InputGroup.Prefix><Envelope className="text-lg text-gray-400" /></InputGroup.Prefix>
                            <InputGroup.Input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none text-xs p-2.5" />
                        </InputGroup>
                    </TextField>

                    <TextField>
                        <Label className="text-xs font-semibold text-gray-700">Profile Picture URL (Optional)</Label>
                        <InputGroup>
                            <InputGroup.Prefix><LinkIcon className="text-lg text-gray-400" /></InputGroup.Prefix>
                            <InputGroup.Input name="image" placeholder="https://example.com/photo.jpg" value={formData.image} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none text-xs p-2.5" />
                        </InputGroup>
                    </TextField>

                    <TextField>
                        <Label className="text-xs font-semibold text-gray-700">Password</Label>
                        <InputGroup>
                            <InputGroup.Prefix><ShieldCheck className="text-lg text-gray-400" /></InputGroup.Prefix>
                            <InputGroup.Input type={isVisible ? "text" : "password"} name="password" placeholder="At least 6 chars (A-Z, a-z)" value={formData.password} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none text-xs p-2.5" />
                            <InputGroup.Suffix>
                                <button type="button" onClick={toggleVisibility}>{isVisible ? <EyeSlash className="text-lg text-gray-400" /> : <Eye className="text-lg text-gray-400" />}</button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </TextField>

                    {error && <div className="p-3 text-xs text-rose-600 bg-rose-50 rounded-xl font-medium">{error}</div>}
                    {success && <div className="p-3 text-xs text-emerald-600 bg-emerald-50 rounded-xl font-medium">{success}</div>}

                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs py-3 rounded-xl transition" isLoading={isLoading}>
                        Complete Registration
                    </Button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    Already have an account? <Link href="/login" className="text-cyan-600 hover:underline font-semibold">Log in</Link>
                </div>
            </Card>
        </div>
    );
}