"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!hideNav && (
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-blue-700">Study Smart</h1>
          <nav className="flex items-center space-x-6">
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-xl"
            >
              Sign Up
            </Link>
          </nav>
        </header>
      )}
      <main>{children}</main>
    </>
  );
}
