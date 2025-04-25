import DashboardLayout from "@/components/dashboard/dashboard-layout"
import StudyRooms from "@/components/dashboard/study-rooms"
import StudyPlan from "@/components/dashboard/study-plan"
import MyClasses from "@/components/dashboard/my-classes"
import UpcomingSchedule from "@/components/dashboard/upcoming-schedule"
import TodoReminders from "@/components/dashboard/todo-reminders"
import StudyMetrics from "@/components/dashboard/study-metrics"
import RecentActivity from "@/components/dashboard/recent-activity"
import RecommendedResources from "@/components/dashboard/recommended-resources"
import Community from "@/components/dashboard/community"
import Utilities from "@/components/dashboard/utilities"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* First column - Priority items */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <StudyPlan />
          <TodoReminders />
          <Utilities />
        </div>

        {/* Second column - Main content */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <MyClasses />
          <StudyRooms />
          <RecentActivity />
        </div>

        {/* Third column - Additional content */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <UpcomingSchedule />
          <StudyMetrics />
          <RecommendedResources />
          <Community />
        </div>
      </div>
    </DashboardLayout>
  )
}
