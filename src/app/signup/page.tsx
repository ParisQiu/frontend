'use client';

import React, { useState, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

const SignupPage: FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = <K extends keyof SignupForm>(
    field: K,
    value: SignupForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
<<<<<<< HEAD
        // "https://studysmarterapp.onrender.com/api/signup",
        "http://localhost:5000/api/signup", 

=======
        "https://studysmarterapp.onrender.com/api/signup",
>>>>>>> 08a84bd23eb09b0cb7937a71ffec793637fafe0f
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

<<<<<<< HEAD
      const data = await res.json();
      console.log("✅ Full signup response:", data);
=======
      const data: { message?: string } = await res.json();
      console.log(data);
>>>>>>> 08a84bd23eb09b0cb7937a71ffec793637fafe0f

      if (res.status === 201) {
        if (!data.user || !data.user.username) {
          setError("Signup succeeded but user info is missing from response");
          return;
        }

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", data.user.username);

        // router.push("/");
        window.location.href = "/";

      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error");
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
          Create an account to get started
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-10">
          <div className="space-y-8">
            <div className="border-b border-gray-300 py-3 w-1/2 mx-auto">
              <input
                name="username"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
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
                onChange={(e) => handleChange("email", e.target.value)}
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
                onChange={(e) => handleChange("password", e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="w-full px-2 py-2 outline-none text-gray-700 text-lg"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-4">{error}</p>
          )}

          <div className="mt-14 space-y-8">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 mx-auto bg-[#19c4c4] text-white py-4 rounded-md font-medium hover:bg-[#15b1b1] transition text-lg block"
            >
              {loading ? "Signing up..." : "SIGN UP"}
            </button>

            <div className="text-center text-lg text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#19c4c4] font-medium">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
