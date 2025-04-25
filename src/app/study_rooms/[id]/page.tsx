'use client';
import { useParams } from 'next/navigation';

export default function StudyRoomDetailPage() {
  const params = useParams();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#19c4c4] mb-4">Study Room Details</h1>
      <p className="text-lg">Room ID: <span className="font-mono">{params.id}</span></p>
      {/* TODO: Fetch and display room details here */}
    </div>
  );
}
