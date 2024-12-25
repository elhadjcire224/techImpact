import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MemberCardSkeleton() {
  return (
    <Card className="bg-primary-foreground text-secondary-foreground border-2">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}
