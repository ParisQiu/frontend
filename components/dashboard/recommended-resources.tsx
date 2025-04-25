import Link from "next/link"
import { BookOpen, FileText, Video } from "lucide-react"

export default function RecommendedResources() {
  const resources = [
    {
      id: 1,
      title: "Cell Division Explained",
      type: "video",
      source: "Khan Academy",
      icon: Video,
      color: "text-red-600 bg-red-100",
    },
    {
      id: 2,
      title: "Psychology Research Methods",
      type: "article",
      source: "Academic Journal",
      icon: FileText,
      color: "text-blue-600 bg-blue-100",
    },
    {
      id: 3,
      title: "Calculus Practice Problems",
      type: "practice",
      source: "Math Learning Center",
      icon: BookOpen,
      color: "text-green-600 bg-green-100",
    },
  ]

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Recommended for You</h2>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center rounded-md border p-3 hover:bg-gray-50">
              <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-md ${resource.color}`}>
                <resource.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium">{resource.title}</h3>
                <p className="text-sm text-gray-500">
                  {resource.type} • {resource.source}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/dashboard/resources" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all recommendations
          </Link>
        </div>
      </div>
    </div>
  )
}
