'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Hide header links on /login and /signup pages
  const hideAuthLinks = pathname === "/login" || pathname === "/signup";

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-tiffany">StudySmart</h1>

      {!hideAuthLinks && (
        <nav className="flex items-center space-x-6">
          <Link
            href="/login"
            className="text-tiffany font-semibold hover:underline"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-tiffany font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
}
