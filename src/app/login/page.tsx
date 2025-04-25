'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define a strict form shape
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();

  // Explicitly type all state
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Generic updater enforces correct key & value types
  const handleChange = <K extends keyof LoginForm>(
    field: K,
    value: LoginForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Strongly type the form event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://studysmarterapp.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

<<<<<<< HEAD
      const data = await res.json();
      console.log("Login response:", data); // ✅ 调试信息

=======
      // Type the expected response shape
      const data: { message?: string } = await res.json();
>>>>>>> 08a84bd23eb09b0cb7937a71ffec793637fafe0f
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        router.push("/");
      }
<<<<<<< HEAD

      // ✅ 保存 token 和用户名
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.user.username);

      // router.push("/");
      // window.location.reload(); // 👈 Force layout to re-run useEffect
      window.location.href = "/";


    } catch (err) {
=======
    } catch {
>>>>>>> 08a84bd23eb09b0cb7937a71ffec793637fafe0f
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full px-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Study Smarter
        </h1>
        <p className="text-center text-gray-600 mb-16">
          Learn Together, Succeed Together.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-10">
          <div className="space-y-8">
            <div className="border-b border-gray-300 py-3 w-1/2 mx-auto">
              <input
                name="email"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
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
                onChange={e => handleChange("password", e.target.value)}
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
                onChange={e => handleChange("rememberMe", e.target.checked)}
                className="h-5 w-5 text-[#19c4c4] rounded border-gray-300 focus:ring-[#19c4c4]"
              />
              <span className="text-gray-600 text-lg">Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-[#19c4c4] text-lg font-medium"
            >
              Forgot password
            </Link>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-6">{error}</p>
          )}

          <div className="mt-14 space-y-8">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 mx-auto bg-[#19c4c4] text-white py-4 rounded-md font-medium hover:bg-[#15b1b1] transition text-lg block"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <div className="text-center text-lg text-gray-600">
              Don&apos;t have an account?{" "}
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
