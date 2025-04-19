'use client';

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import Link from "next/link";
import "../styles/homepage.css";

// 统一使用提夫尼蓝 #19c4c4
const ThreeDText = () => {
  return (
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
};

export default function Page() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://studysmarterapp.onrender.com/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
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
            Empowering students to study smarter – with integrated tools for resource management, collaboration, and academic excellence.
          </p>
          <p className="text-lg italic text-[#19c4c4] mt-2">
            Study smart, success together.
          </p>
          <Link href="/docs" className="api-docs-link text-[#19c4c4] hover:underline">
            View Live API Documentation
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-heading">About StudySmart</h2>
          <p className="section-description">
            StudySmart is your ultimate platform for academic success. Our system combines cutting-edge technology with a user-friendly interface to help you manage your study resources, create collaborative study rooms, and get real-time updates from our robust API.
          </p>
          <div className="features-grid">
            <div className="card">
              <h3 className="card-title">User Profiles</h3>
              <p className="card-text">
                Access personalized dashboards and monitor your academic progress with ease.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">Study Rooms</h3>
              <p className="card-text">
                Join and create collaborative study rooms to engage with peers and share resources.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">Interactive Posts</h3>
              <p className="card-text">
                Express ideas, share insights, and discuss topics in real-time with interactive posts.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">Media Sharing</h3>
              <p className="card-text">
                Enhance discussions by uploading and sharing images, videos, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Removed Signup Form Section */}

      {/* API Data Section */}
      <section className="api-data-section">
        <div className="api-data-container">
          <h2 className="section-heading">Live API Data</h2>
          {loading && <p>Loading user data...</p>}
          {error && <p className="text-[#19c4c4]">Error: {error}</p>}
          {!loading && !error && (
            <>
              <p className="api-data-label">
                Data from: <strong>GET /api/users</strong> (<code>users</code> state)
              </p>
              <ul className="api-data-list">
                {users.map(user => (
                  <li key={user.id}>
                    {user.username} ({user.email})
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="api-data-note">
            This section dynamically renders live data fetched from our backend API.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} StudySmart. All rights reserved.</p>
      </footer>
    </main>
  );
}
