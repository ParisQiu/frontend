// frontend/src/app/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-600 p-8">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
}
