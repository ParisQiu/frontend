'use client';

import React, { Suspense, FC, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import Link from 'next/link';
import '../styles/homepage.css';

// Shape of user data from API
interface User {
  id: number;
  username: string;
  email: string;
}

// 3D Text component using Tiffany Blue
const ThreeDText: FC = () => (
  <Text
    position={[0, 0, 0]}
    fontSize={1.8}
    color="#19c4c4"
    anchorX="center"
    anchorY="middle"
    rotation={[0, 0.4, 0]}
  >
    StudySmart
  </Text>
);

// Homepage component
const Page: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const res = await fetch('https://studysmarterapp.onrender.com/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-mint flex flex-col">
      {/* Hero Section */}
      <section className="hero-section relative">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <ThreeDText />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
        <div className="hero-overlay">
          <h1 className="hero-title">StudySmart</h1>
          <p className="hero-subtitle">
            Empowering students to study smarter – integrated tools for resource management, collaboration, and academic excellence.
          </p>
          <p className="text-lg italic text-[#19c4c4] mt-2">
            Study smart, succeed together.
          </p>
          <Link href="https://studysmarterapp.onrender.com/docs/" className="api-docs-link text-[#19c4c4] hover:underline">
            View Live API Documentation
          </Link>
        </div>
      </section>

      {/* Users Data Section */}
      <section className="api-data-section">
        <div className="api-data-container">
          <h2 className="section-heading">Registered Users</h2>
          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && (
            <ul className="api-data-list">
              {users.map((u) => (
                <li key={u.id}>
                  {u.username} ({u.email})
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} StudySmart. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Page;
