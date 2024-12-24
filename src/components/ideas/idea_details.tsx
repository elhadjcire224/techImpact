"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toggleLike } from "@/lib/actions/ideas.actions"
import { useState } from "react"
import toast from "react-hot-toast"
import { LikeButton, ShareButton } from "./idea_buttons"
import { DetailedIdeaResponse } from "@/lib/actions/ideas.actions"
import { cn } from "@/lib/utils"
import { statusConfig } from "@/types/status_ideas"

type IdeaDetailsProps = Omit<DetailedIdeaResponse, 'comments'>

export default function IdeaDetails({ idea }: { idea: IdeaDetailsProps }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await toggleLike(idea.id)
    } catch (error) {
      toast.error("Failed to update like")
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    if (!navigator.share) {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
      return
    }

    try {
      await navigator.share({
        title: idea.title,
        text: idea.description,
        url: window.location.href
      })
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share')
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Header avec Author + Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={idea.author.image} alt={idea.author.name || ''} />
            <AvatarFallback>{(idea.author.name ?? "AN").slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{idea.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(idea.createdAt).toLocaleDateString()}
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
              onClick={handleLike}
              liked={idea.hasLiked}
              numberLikes={idea._count.likes}
            />
            <span className="text-sm text-muted-foreground">
              {idea._count.comments} comments
            </span>
            <ShareButton onClick={handleShare} />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}