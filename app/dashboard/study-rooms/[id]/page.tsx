import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import StudyRoomDetail from "@/components/dashboard/study-room-detail"

export const metadata: Metadata = {
  title: "Study Room | StudySmarter",
  description: "Join and collaborate in a study room",
}

export default function StudyRoomPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <StudyRoomDetail roomId={params.id} />
    </DashboardLayout>
  )
}
