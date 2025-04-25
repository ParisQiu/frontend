'use client';

import React, { useEffect, useState } from "react";

interface CreateRoomModalProps {
  onClose: () => void;
}

export default function CreateRoomModal({ onClose }: CreateRoomModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    console.log("✅ CreateRoomModal component loaded");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !tags || !time || !duration || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const creatorId = localStorage.getItem("user_id");

      const res = await fetch("http://127.0.0.1:5000/api/study_rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: title,
          description,
          tags,
          venue: visibility,
          time,
          location,
          capacity: parseInt(duration),
          creator_id: parseInt(creatorId || "0"),
        }),
      });

      if (res.ok) {
        alert("Study room created!");
        window.location.href = "/";
      } else {
        const errorData = await res.json();
        alert("Error: " + (errorData.message || "Failed to create room"));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-xl p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">📝</span> Create Study Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium">Room Title</label>
            <input
              type="text"
              className="w-full border px-4 py-3 rounded-md"
              placeholder="Enter room name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              className="w-full border px-4 py-3 rounded-md"
              placeholder="What is this room about?"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Tags/Subjects</label>
            <input
              type="text"
              className="w-full border px-4 py-3 rounded-md"
              placeholder="e.g. Math, Physics"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Visibility</label>
            <select
              className="w-full border px-4 py-3 rounded-md"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Time</label>
            <input
              type="text"
              className="w-full border px-4 py-3 rounded-md"
              placeholder="e.g. 2:00 - 5:00 PM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Duration (Capacity)</label>
            <input
              type="number"
              className="w-full border px-4 py-3 rounded-md"
              placeholder="e.g. 5"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              className="w-full border px-4 py-3 rounded-md"
              placeholder="e.g. 500 El Camino Real, Santa Clara"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="px-5 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-tiffany text-white rounded-md hover:bg-[#15b1b1]"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
