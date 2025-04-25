import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function MyClasses() {
  const classes = [
    {
      id: 1,
      title: "Biology 101",
      instructor: "Dr. Sarah Johnson",
      completion: 78,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 2,
      title: "Introduction to Psychology",
      instructor: "Prof. Michael Chen",
      completion: 45,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 3,
      title: "Calculus II",
      instructor: "Dr. Robert Smith",
      completion: 62,
      image: "/placeholder.svg?height=80&width=120",
    },
  ]

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">My Classes</h2>
        <Link href="/dashboard/classes" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all
        </Link>
      </div>
      <div className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {classes.map((course) => (
            <div key={course.id} className="rounded-lg border p-3 hover:bg-gray-50">
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                    <BookOpen className="h-8 w-8" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Completion</span>
                      <span className="text-xs font-medium">{course.completion}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200">
                      <div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${course.completion}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <Link
                  href={`/dashboard/classes/${course.id}/syllabus`}
                  className="rounded-md px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                >
                  View Syllabus
                </Link>
                <Link
                  href={`/dashboard/classes/${course.id}`}
                  className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-200"
                >
                  Continue
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
