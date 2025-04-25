import { Award, TrendingUp } from "lucide-react"

export default function StudyMetrics() {
  // Sample data for the weekly study time chart
  const weeklyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.0 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 4.0 },
    { day: "Fri", hours: 2.0 },
    { day: "Sat", hours: 3.5 },
    { day: "Sun", hours: 1.0 },
  ]

  // Calculate max hours for scaling
  const maxHours = Math.max(...weeklyData.map((d) => d.hours))

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Study Metrics</h2>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium">Weekly Study Time</h3>
          <div className="flex h-32 items-end justify-between">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-8 rounded-t bg-blue-500" style={{ height: `${(day.hours / maxHours) * 100}%` }}></div>
                <span className="mt-1 text-xs">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 border-t pt-4">
          <h3 className="mb-2 text-sm font-medium">Current Streak</h3>
          <div className="flex items-center">
            <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">7 Days</p>
              <p className="text-xs text-gray-500">Keep it up! You're on a roll.</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-2 text-sm font-medium">Achievements</h3>
          <div className="flex space-x-2">
            {[
              { name: "Early Bird", color: "bg-yellow-100 text-yellow-600" },
              { name: "Focus Master", color: "bg-purple-100 text-purple-600" },
              { name: "Consistent", color: "bg-green-100 text-green-600" },
            ].map((badge, index) => (
              <div
                key={index}
                className={`flex items-center rounded-full px-3 py-1 text-xs font-medium ${badge.color}`}
              >
                <Award className="mr-1 h-3 w-3" />
                {badge.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
