// app/create-room/page.tsx
'use client';

import CreateRoomModal from '@/components/CreateRoomModal'; // adjust path if needed

export default function CreateRoomPage() {
  return (
    <div className="min-h-screen px-8 py-12 bg-white text-gray-800">
      <div className="max-w-2xl mx-auto">
        <CreateRoomModal />
      </div>
    </div>
  );
}
