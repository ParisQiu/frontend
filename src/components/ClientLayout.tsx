'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    setUsername(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const handlePostClick = () => {
    console.log("🖊️ Post button clicked");
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/create-room"; // ✅ navigate to page
    } else {
      alert("You must be logged in to create a study room. Redirecting to login...");
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold text-[#19c4c4] hover:opacity-90 transition">
            StudySmart
          </Link>

          {/* Right Side */}
          <nav className="flex space-x-4 items-center">
            {username ? (
              <>
                {/* ✏️ Post Button with Tooltip */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <button
                    onClick={handlePostClick}
                    className="px-3 py-2 rounded-full border border-[#19c4c4] hover:bg-[#19c4c4] hover:text-white transition"
                  >
                    🖊️
                  </button>
                  {showTooltip && (
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                      Create Study Room
                    </div>
                  )}
                </div>

                <span className="text-[#19c4c4] text-lg font-medium">Hi, {username}</span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full border border-[#19c4c4] text-[#19c4c4] hover:bg-[#19c4c4] hover:text-white transition duration-300 shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full border border-[#19c4c4] text-[#19c4c4] hover:bg-[#19c4c4] hover:text-white transition duration-300 shadow-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 rounded-full bg-[#19c4c4] text-white hover:bg-[#15b1b1] transition duration-300 shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mt-6">{children}</main>
    </div>
  );
};

export default ClientLayout;
