'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface StudyRoom {
  id: number;
  name: string;
  description: string;
  tags: string;
  time: string;
  location: string;
  venue: string;
  capacity: number;
  joinedUsers?: string[];
}

const Page = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [search, setSearch] = useState('');
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");
  const username = typeof window !== 'undefined' ? (localStorage.getItem("username") || "") : "";
  const storageKey = typeof window !== 'undefined' && username ? `joinedRooms_${username}` : "";

  const handleJoin = (roomId: number) => {
    if (!isLoggedIn) {
      alert('You must be logged in to join a study room.');
      return;
    }
    const joinedIds: number[] = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (joinedIds.includes(roomId)) {
      alert('You have already joined this room.');
      return;
    }
    joinedIds.push(roomId);
    localStorage.setItem(storageKey, JSON.stringify(joinedIds));
    setRooms(prev => prev.map(r =>
      r.id === roomId ? { ...r, joinedUsers: [...(r.joinedUsers || []), username] } : r
    ));
  };

  const handleLeave = (roomId: number) => {
    if (!isLoggedIn) {
      alert('You must be logged in to leave a study room.');
      return;
    }
    const joinedIds: number[] = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!joinedIds.includes(roomId)) {
      alert('You have not joined this room.');
      return;
    }
    const newJoinedIds = joinedIds.filter(id => id !== roomId);
    localStorage.setItem(storageKey, JSON.stringify(newJoinedIds));
    setRooms(prev => prev.map(r =>
      r.id === roomId ? { ...r, joinedUsers: (r.joinedUsers || []).filter(u => u !== username) } : r
    ));
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/study_rooms");
        const data: StudyRoom[] = await res.json();
        const joinedIds: number[] = JSON.parse(localStorage.getItem(storageKey) || "[]");
        setRooms(data.map(r => ({
          ...r,
          joinedUsers: joinedIds.includes(r.id) ? [username] : [],
        })));
      } catch (err) {
        console.error("Failed to load study rooms:", err);
      }
    };
    if (typeof window !== 'undefined') fetchRooms();
  }, [storageKey]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="h-[50vh] flex items-center justify-center bg-cover bg-center relative border-4 border-[#19c4c4]"
        style={{ backgroundImage: "url('/homepage_picture.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 text-center">
          <h1 className="text-[100px] leading-tight font-extrabold text-[#19c4c4] drop-shadow-[0_0_18px_white]">
            StudySmart
          </h1>
          <p className="mt-6 text-6xl text-white font-semibold italic drop-shadow-[0_0_16px_white]">
            Study smart, success together.
          </p>
        </div>
      </section>

      {/* Study Rooms Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#19c4c4] mb-8 text-center tracking-tight">
            Active Study Rooms
          </h2>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search rooms by name, description, or location..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#19c4c4]"
            />
          </div>

          <div className="bg-[#f7fcfd] border border-[#19c4c4]/30 rounded-2xl shadow-lg p-4">
            {rooms.length === 0 ? (
              <p className="text-center text-lg text-gray-600">
                No study rooms yet. Be the first to create one!
              </p>
            ) : (
              (() => {
                const filteredRooms = rooms.filter(room =>
                  (room?.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
                  (room?.description ?? '').toLowerCase().includes(search.toLowerCase()) ||
                  (room?.location ?? '').toLowerCase().includes(search.toLowerCase())
                );
                if (filteredRooms.length === 0) {
                  return (
                    <p className="text-center text-lg text-gray-600">
                      No matching study rooms found.
                    </p>
                  );
                }
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredRooms.map((room, idx) => (
                      <div
                        key={`room-${room.id ?? idx}-${idx}`}
                        className="bg-white h-full border-l-4 border-[#19c4c4] rounded-2xl shadow-md p-6 flex flex-col hover:shadow-xl transition-all"
                      >
                        <h3 className="text-2xl font-bold text-[#19c4c4] mb-2 truncate">
                          {room.name}
                        </h3>
                        <div className="text-gray-700 text-[1rem] space-y-1 flex-grow">
                          {room.description && (
                            <p>
                              <span className="font-semibold text-[#19c4c4]">Description:</span> {room.description}
                            </p>
                          )}
                          {room.tags && (
                            <div className="flex flex-wrap gap-2">
                              {room.tags.split(',').map((tag, idx) => (
                                <span key={`room-${room.id}-tag-${idx}`} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-[#19c4c4]">
                                  #{tag.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                          {room.time && (
                            <p>
                              <span className="font-semibold text-[#19c4c4]">Time:</span> {room.time}
                            </p>
                          )}
                          {room.capacity !== undefined && (
                            <p>
                              <span className="font-semibold text-[#19c4c4]">Capacity:</span> {room.capacity}
                            </p>
                          )}
                          {room.venue && (
                            <p>
                              <span className="font-semibold text-[#19c4c4]">Venue:</span> {room.venue}
                            </p>
                          )}
                          {room.location && (
                            <p>
                              <span className="font-semibold text-[#19c4c4]">Location:</span> {room.location}
                            </p>
                          )}
                        </div>
                        {room.joinedUsers && room.joinedUsers.length > 0 && (
                          <div className="mb-2 text-sm text-gray-600 border-b pb-2">
                            <span className="font-semibold text-[#19c4c4]">Joined:</span> {room.joinedUsers.join(", ")}
                          </div>
                        )}
                        <div className="mt-2 flex space-x-2 w-full">
                          <button
                            onClick={() => handleJoin(room.id)}
                            className="flex-1 py-2 bg-gradient-to-r from-[#19c4c4] to-[#15b1b1] text-white font-semibold rounded-lg shadow hover:from-[#15b1b1] hover:to-[#19c4c4] transition"
                          >
                            Join
                          </button>
                          {room.joinedUsers?.includes(username) && (
                            <button
                              onClick={() => handleLeave(room.id)}
                              className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                            >
                              Leave
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-8 py-4">
        {new Date().getFullYear()} StudySmart. All rights reserved.
      </footer>
    </main>
  );
};

export default Page;
