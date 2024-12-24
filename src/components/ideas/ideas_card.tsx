import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { type IdeaCard, IdeaStatus } from "@/types/ideas_types"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"



const statusConfig: Record<IdeaStatus, { label: string, className: string }> = {
  [IdeaStatus.InDiscussion]: {
    label: IdeaStatus.InDiscussion,
    className: 'bg-blue-500/10 text-blue-500'
  },
  [IdeaStatus.InProgress]: {
    label: IdeaStatus.InProgress,
    className: 'bg-violet-500/10 text-violet-500'
  },
  [IdeaStatus.Completed]: {
    label: IdeaStatus.Completed,
    className: 'bg-green-500/10 text-green-500'
  }
}


export function IdeaCard({ idea: {
  id,
  title,
  description,
  author,
  hasLiked,
  status,
  tags,
  _count,
  createdAt,
  mentorValidated
} }: { idea: IdeaCard }) {
  const formattedDate = new Date(createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
  console.log('tags', tags)
  return (
    <Card className="w-full max-w-xl overflow-hidden hover:bg-primary-foreground/90 hover:shadow-card hover:cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.image || ''} alt={author?.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link href={`/profile/${author.id}`}>
              <span className="text-sm font-medium text-violet-500">{author.name}</span>
            </Link>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mentorValidated && (
            <Badge className="bg-green-500/10 text-green-500">
              Validated
            </Badge>
          )}
          <Badge variant="secondary" className={cn("px-1 py-0.5", statusConfig[status].className)}>
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>

      <Link href={`/ideas/${id}`}>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold leading-none tracking-tight line-clamp-1">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="bg-sky-500/5 text-sky-500">
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex justify-start space-x-2 text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1/5"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement like functionality
          }}
        >
          <Heart className={cn("h-4 w-4", hasLiked && "text-red-500 fill-red-500 ")} />
          <span className="text-sm">{_count.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1/5"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Navigate to comments
          }}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{_count.comments}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement share functionality
          }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
