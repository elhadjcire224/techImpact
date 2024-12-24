import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, formatDate } from "@/lib/utils"
import { type IdeaCard, IdeaStatus } from "@/types/ideas_types"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import toast from "react-hot-toast"
import { toggleLike, addComment } from "@/lib/actions/ideas.actions"
import { useState } from "react"
import { LikeButton, ShareButton } from "./idea_buttons"
import { CommentModal } from "./comment_modal"
import { statusConfig } from "@/types/status_ideas"


export default function IdeaCard({ idea }: { idea: IdeaCard }) {
  const {
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
  } = idea
  const formattedDate = formatDate(createdAt);

  const [liked, setLiked] = useState(hasLiked)
  const [numberLikes, setNumberLikes] = useState(_count.likes)
  const [comments, setComments] = useState(_count.comments)

  const handleLike = async () => {
    try {
      setLiked((prev) => !prev)
      setNumberLikes(prev => liked ? prev - 1 : prev + 1)
      await toggleLike(id)
    } catch (error) {
      toast.error("Error while liking idea")
      setLiked((prev) => !prev)
      setNumberLikes((prev) => prev - 1)
    }
  }

  const handleShare = async () => {
    const url = `${window.location.href}/${id}`
    if (!navigator.share) {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
      return
    }

    try {
      await navigator.share({
        title,
        url,
        text: description
      })
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share')
      }
    }
  }

  const onCommentSubmit = async (commentText: string) => {
    try {
      await addComment(id, commentText)
      setComments(prev => prev + 1)
      toast.success("Comment added successfully")
    } catch (error) {
      toast.error("Error while adding comment")
    }
  }

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
        <LikeButton liked={liked} numberLikes={numberLikes} onClick={handleLike} />
        <CommentModal onCommentSubmit={onCommentSubmit}>

          <MessageCircle className="h-4 w-4" />
        </CommentModal>
        <span className="text-sm">{comments}</span>
        <ShareButton onClick={handleShare} />
      </CardFooter>
    </Card>
  )
}

