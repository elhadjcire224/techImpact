"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { handleLike, handleShare } from "@/lib/idea.utils"
import { useState } from "react"
import toast from "react-hot-toast"
import { LikeButton, ShareButton } from "./idea_buttons"
import { DetailedIdeaResponse } from "@/lib/actions/ideas.actions"
import { cn, formatDate } from "@/lib/utils"
import { statusConfig } from "@/types/status_ideas"

type IdeaDetailsProps = Omit<DetailedIdeaResponse, 'comments'>

export default function IdeaDetails({ idea }: { idea: IdeaDetailsProps }) {
  const [isLoading, setIsLoading] = useState(false)
  const [liked, setLiked] = useState(idea.hasLiked)
  const [likeCount, setLikeCount] = useState(idea._count.likes)

  const onLike = async () => {
    if (isLoading) return
    setIsLoading(true)
    setLiked(prev => !prev)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)

    const success = await handleLike(idea.id)
    if (!success) {
      setLiked(prev => !prev)
      setLikeCount(prev => liked ? prev + 1 : prev - 1)
    }
    setIsLoading(false)
  }

  const onShare = () => handleShare(
    idea.title,
    idea.description,
    window.location.href
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={idea.author.image} alt={idea.author.name || ''} />
            <AvatarFallback>{(idea.author.name ?? "AN").slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{idea.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(idea.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className={cn("px-2 py-1", statusConfig[idea.status].className)}>
            {statusConfig[idea.status].label}
          </Badge>
          {idea.mentorValidated && (
            <Badge className="bg-green-500/10 text-green-500">Validé</Badge>
          )}
        </div>
      </div>

      <h1 className="text-3xl font-bold">{idea.title}</h1>

      <Card>
        <CardContent className="pt-6 px-4">
          <p className="whitespace-pre-wrap">{idea.description}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <div className="flex flex-wrap gap-2">
            {idea.tags.map(tag => (
              <Badge
                key={tag.id}
                variant="outline"
                className="bg-sky-500/10 text-sky-500"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between w-full">
            <LikeButton
              onClick={onLike}
              liked={liked}
              numberLikes={likeCount}
            />
            <span className="text-sm text-muted-foreground">
              {idea._count.comments} comments
            </span>
            <ShareButton onClick={onShare} />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}