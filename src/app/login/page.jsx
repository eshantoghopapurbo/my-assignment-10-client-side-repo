

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

import { Eye, EyeSlash, Person, Envelope, ShieldCheck, Link as LinkIcon } from "@gravity-ui/icons";
import { authClient, signIn, } from "@/lib/auth-client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }
    const [formData, setFormData] = useState({
        email: "",
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

    console.log("mongodb user ", process.env.MONGO_DB_URL);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { data, error: authError } = await signIn.email({
                email: formData.email,
                password: formData.password,
                // মনে রাখবেন: লগইনের সময় সাধারণত 'role' পাঠানোর প্রয়োজন হয় না, 
                // কারণ ইউজার অলরেডি ডাটাবেজে আছে। 
            });

            if (authError) {
                setError(authError.message || "Login failed.");
                return;
            }

            console.log("Login user data:", data);

            // ৩. রোল অনুযায়ী রিডাইরেক্ট (লগইন করা ইউজারের রোল চেক করুন)
            // 'data.user.role' এ রোল পাওয়ার কথা যদি আপনার অথেন্টিকেশন লাইব্রেরি সেটি দেয়
            const userRole = data?.user?.role;

            if (userRole === "client") {
                router.push("/dashboard/client");
            } else if (userRole === "freelancer") {
                router.push("/dashboard/freelancer");
            } else {
                // রোল না পাওয়া গেলে ডিফল্ট ড্যাশবোর্ডে পাঠান
                router.push("/dashboard/client");
            }

        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
            <Card className="w-full max-w-md p-4 shadow-lg">
                <CardHeader className="flex flex-col gap-1 items-center justify-center pb-6">
                    <Link href="/" className="font-extrabold text-3xl text-blue-600 dark:text-blue-500 tracking-tight">
                        SkillSwap
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Create an Account</h1>
                    <p className="text-small text-zinc-500 dark:text-zinc-400">Login to get started</p>
                </CardHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Google */}
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="bordered"
                        className="w-full mt-5 mb-5 border-1 rounded-none hover:bg-blue-500"
                    >
                        <FcGoogle />
                        Login with Google
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center my-2">
                        <hr className="flex-grow border-t border-gray-300" />

                        <span className="px-3 text-sm font-medium uppercase text-gray-500">
                            or continue with email
                        </span>

                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    {/* Email */}
                    <TextField>
                        <Label>Email</Label>
                        <InputGroup>
                            <InputGroup.Prefix><Envelope className="text-xl text-zinc-400" /></InputGroup.Prefix>
                            <InputGroup.Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none" />
                        </InputGroup>
                    </TextField>
                    {/* Password */}
                    <TextField>
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroup.Prefix><ShieldCheck className="text-xl text-zinc-400" /></InputGroup.Prefix>
                            <InputGroup.Input type={isVisible ? "text" : "password"} name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none" />
                            <InputGroup.Suffix>
                                <button type="button" onClick={toggleVisibility}>{isVisible ? <EyeSlash className="text-xl text-zinc-400" /> : <Eye className="text-xl text-zinc-400" />}</button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </TextField>


                    {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl">{error}</div>}
                    {success && <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-950/30 rounded-xl">{success}</div>}

                    <Button type="submit" color="primary" className="w-full font-semibold" isLoading={isLoading}>
                        Login
                    </Button>
                </form>

                <div className="mt-6 text-center text-small text-zinc-500 dark:text-zinc-400">
                    Already have an account? <Link href="/register" className="text-primary hover:underline font-medium">Register</Link>
                </div>
            </Card>
        </div>
    );
}