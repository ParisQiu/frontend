import Link from "next/link"
import { MessageSquare } from "lucide-react"

export default function Community() {
  const discussions = [
    {
      id: 1,
      title: "Tips for memorizing biology terms?",
      author: "Alex Chen",
      replies: 12,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Study group for Calculus II final",
      author: "Maria Rodriguez",
      replies: 8,
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Best resources for Psychology research",
      author: "James Wilson",
      replies: 5,
      time: "2 days ago",
    },
  ]

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Community Discussions</h2>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="rounded-md border p-3 hover:bg-gray-50">
              <Link href={`/dashboard/community/discussions/${discussion.id}`}>
                <h3 className="font-medium">{discussion.title}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-gray-500">by {discussion.author}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    <span>{discussion.replies} replies</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">{discussion.time}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/dashboard/community" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all discussions
          </Link>
        </div>
      </div>
    </div>
  )
}
