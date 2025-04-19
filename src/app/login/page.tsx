'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://studysmarterapp.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/");
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
        <p className="text-center text-gray-600 mb-16">Learn Together, Succeed Together.</p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-10">
          <div className="space-y-8">
            <div className="border-b border-gray-300 py-3 w-1/2 mx-auto">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="text"
                placeholder="Email / Phone number"
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

          <div className="flex items-center justify-between mt-8 w-1/2 mx-auto">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                className="h-5 w-5 text-[#19c4c4] rounded border-gray-300 focus:ring-[#19c4c4]"
              />
              <span className="text-gray-600 text-lg">Remember me</span>
            </label>

            <Link href="/forgot-password" className="text-[#19c4c4] text-lg font-medium">
              Forgot password
            </Link>
          </div>

          {error && <p className="text-red-600 text-sm text-center mt-6">{error}</p>}

          <div className="mt-14 space-y-8">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 mx-auto bg-[#19c4c4] text-white py-4 rounded-md font-medium hover:bg-[#15b1b1] transition text-lg block"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <div className="text-center text-lg text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#19c4c4] font-medium">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}