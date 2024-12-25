import { getDashboardAnalytics } from "@/lib/actions/analytics.actions"
import { Users, Lightbulb, UserCog, MessagesSquare, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default async function DashBoard() {
  const analytics = await getDashboardAnalytics()

  return (
    <div className="p-6 space-y-6 my-10">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users Card */}
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-muted-foreground">Total Users</p>
              <p className="text-2xl font-semibold text-foreground">{analytics.totalUsers}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Ideas Card */}
        <Card>
          <CardContent className="flex items-center p-6">
            <Lightbulb className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-muted-foreground">Total Ideas</p>
              <p className="text-2xl font-semibold text-foreground">{analytics.totalIdeas}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Mentors Card */}
        <Card>
          <CardContent className="flex items-center p-6">
            <UserCog className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-muted-foreground">Total Mentors</p>
              <p className="text-2xl font-semibold text-foreground">{analytics.totalMentors}</p>
            </div>
          </CardContent>
        </Card>

        {/* Ideas in Discussion Card */}
        <Card>
          <CardContent className="flex items-center p-6">
            <MessagesSquare className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-muted-foreground">Ideas in Discussion</p>
              <p className="text-2xl font-semibold text-foreground">{analytics.ideasByStatus.inDiscussion}</p>
            </div>
          </CardContent>
        </Card>

        {/* Ideas in Progress Card */}
        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-muted-foreground">Ideas in Progress</p>
              <p className="text-2xl font-semibold text-foreground">{analytics.ideasByStatus.inProgress}</p>
            </div>
          </CardContent>
        </Card>

        {/* Completed Ideas Card */}
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-muted-foreground">Completed Ideas</p>
              <p className="text-2xl font-semibold text-foreground">{analytics.ideasByStatus.completed}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}