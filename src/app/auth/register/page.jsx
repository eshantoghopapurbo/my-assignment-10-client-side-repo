

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
import { signUp } from "@/lib/auth-client";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "", 
    password: "",
    role:"client",
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

  const handleRoleChange = (value) => {
  setFormData((prev) => ({ ...prev, role: value }));
  };

  console.log("mongodb user " , process.env.MONGO_DB_URL);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    if (!formData.name || !formData.email || !formData.password || !formData.image) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image,
        role: formData.role, 
        callbackURL: "/",
      });  
      console.log("user ", data); 
      
      if (authError) {
        setError(authError.message || "Signup failed.");
        return;
      }

      setSuccess("Account created successfully!");
      setFormData({ name: "", email: "", image: "", password: "",role: ""});

    } catch (err) {
      console.error("Signup Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center justify-center pb-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Create an Account</h1>
          <p className="text-small text-zinc-500 dark:text-zinc-400">Register to get started</p>
        </CardHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

           <div className="flex flex-col gap-4">
  <Label className="text-black font-semibold">Subscription plan</Label>
  
  <RadioGroup 
    defaultValue="client" 
    name="client" 
    className="flex flex-row gap-10 " 
    onValueChange={handleRoleChange}
  > 
    {/* Client Option */}
    <Radio value="client" className="flex items-center gap-2 cursor-pointer">
      <Radio.Control id="client-radio" />
      <Radio.Content>
        {/* htmlFor ব্যবহার করে লেবেলটিকে রেডিওর সাথে কানেক্ট করুন */}
        <Label htmlFor="client-radio" className="text-black cursor-pointer">Client</Label>
      </Radio.Content>
    </Radio>

    {/* Freelancer Option */}
    <Radio value="freelancer" className="flex items-center gap-2 cursor-pointer">
      <Radio.Control id="freelancer-radio" /> 
      <Radio.Content>
        <Label htmlFor="freelancer-radio" className="text-black cursor-pointer">Freelancer</Label>
      </Radio.Content>        
    </Radio>
  </RadioGroup>
</div>

          {/* Name */}
          <TextField>
            <Label>Full Name</Label>
            <InputGroup>
              <InputGroup.Prefix><Person className="text-xl text-zinc-400" /></InputGroup.Prefix>
              <InputGroup.Input name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none" />
            </InputGroup>
          </TextField>

          {/* Email */}
          <TextField>
            <Label>Email</Label>
            <InputGroup>
              <InputGroup.Prefix><Envelope className="text-xl text-zinc-400" /></InputGroup.Prefix>
              <InputGroup.Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none" />
            </InputGroup>
          </TextField>

          {/* Image URL (নতুন যোগ করা হয়েছে) */}
          <TextField>
            <Label>Image URL</Label>
            <InputGroup>
              <InputGroup.Prefix><LinkIcon className="text-xl text-zinc-400" /></InputGroup.Prefix>
              <InputGroup.Input name="image" placeholder="https://example.com/avatar.jpg" value={formData.image} onChange={handleInputChange} className="bg-transparent w-full focus:outline-none" />
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
            Register
          </Button>
        </form>

        <div className="mt-6 text-center text-small text-zinc-500 dark:text-zinc-400">
          Already have an account? <Link href="/auth/signin" className="text-primary hover:underline font-medium">log in</Link>
        </div>
      </Card>
    </div>
  );
}