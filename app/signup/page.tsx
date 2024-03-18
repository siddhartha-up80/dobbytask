"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect user to login page after successful signup
        router.push("/login");
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[90vh] px-4">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-md flex-1">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm ">Sign up to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block mb-2 text-sm">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className="w-full px-3 py-2"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Button type="submit" className="w-full px-8 py-3 font-semibold">
                Sign Up
              </Button>
            </div>
            <p className="px-6 text-sm text-center ">
              Already have an account?
              <Link href="/login" className="hover:underline text-rose-600">
                {" "}
                Login
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
