'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://studysmarterapp.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data); // Log API response (including token)

      if (res.status === 201) {
        router.push("/");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full px-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Study Smarter</h1>
        <p className="text-center text-gray-600 mb-16">Create an account to get started</p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-10">
          <div className="space-y-8">
            <div className="border-b border-gray-300 py-3 w-1/2 mx-auto">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                required
                className="w-full px-2 py-2 outline-none text-gray-700 text-lg"
              />
            </div>

            <div className="border-b border-gray-300 py-3 w-1/2 mx-auto">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
                className="w-full px-2 py-2 outline-none text-gray-700 text-lg"
              />
            </div>

            <div className="border-b border-gray-300 py-3 w-1/2 mx-auto">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
                className="w-full px-2 py-2 outline-none text-gray-700 text-lg"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}

          <div className="mt-14 space-y-8">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 mx-auto bg-[#19c4c4] text-white py-4 rounded-md font-medium hover:bg-[#15b1b1] transition text-lg block"
            >
              {loading ? "Signing up..." : "SIGN UP"}
            </button>

            <div className="text-center text-lg text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#19c4c4] font-medium">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
