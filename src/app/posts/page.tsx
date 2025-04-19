// File: src/pages/Posts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [content, setContent] = useState("");
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  // Pull user ID from storage (ensure you set this on login/signup)
  const userId = parseInt(localStorage.getItem("user_id") || "0", 10);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    Promise.all([
      fetch("https://studysmarterapp.onrender.com/api/study_rooms", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to load rooms")
      ),
      fetch("https://studysmarterapp.onrender.com/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) =>
        res.ok ? res.json() : Promise.reject("Failed to load posts")
      ),
    ])
      .then(([roomsData, postsData]) => {
        setRooms(roomsData);
        setPosts(postsData);
      })
      .catch((err) => {
        if (err === "Unauthorized") navigate("/login");
        else setError(err.toString());
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(
        "https://studysmarterapp.onrender.com/api/posts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content.trim(),
            creator_id: userId,
            room_id: roomId || undefined,
          }),
        }
      );
      if (res.status === 201) {
        const newPost = await res.json();
        setPosts([newPost, ...posts]);
        setContent("");
        setRoomId("");
      } else if (res.status === 400) {
        const err = await res.json().catch(() => ({}));
        setError(err.message || "Invalid input.");
      } else {
        setError("Failed to create post.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="posts-page">
        <p>Loading…</p>
      </div>
    );
  if (error)
    return (
      <div className="posts-page">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="posts-page">
      <h2 className="posts-title">Posts</h2>

      {/* New Post Form */}
      <form className="posts-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        <textarea
          className="posts-input"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
        />
        <select
          className="posts-select"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          disabled={submitting}
        >
          <option value="">— No Room —</option>
          {rooms.map((r) => (
            <option key={r.room_id} value={r.room_id}>
              {r.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={submitting}>
          {submitting ? "Posting…" : "Post"}
        </button>
      </form>

      {/* Posts List */}
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-card" key={post.post_id}>
            <p className="post-content">{post.content}</p>
            <div className="post-meta">
              <span>By: {post.creator_id}</span>
              {post.room_id && <span>Room: {post.room_id}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
