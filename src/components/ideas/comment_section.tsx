"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DetailedIdeaResponse, deleteComment } from "@/lib/actions/ideas.actions"
import { useState } from "react"
import { CommentModal } from "./comment_modal"
import Link from "next/link"
import { handleCommentSubmit } from "@/lib/idea.utils"
import { useSession } from "next-auth/react"
import { formatDate } from "@/lib/utils"
import { DeleteButton } from "./idea_buttons"
import toast from "react-hot-toast"

type Comment = DetailedIdeaResponse['comments'][number]

interface CommentSectionProps {
  comments: Comment[];
  ideaId: string;
}

export function CommentSection({ comments, ideaId }: CommentSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [commentsList, setCommentsList] = useState(comments)
  const session = useSession()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const onCommentSubmit = async (content: string) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    const result = await handleCommentSubmit(ideaId, content)
    if (result) {
      // Optimistic update - you might want to refresh the comments instead
      setCommentsList(prev => [{
        id: result.id,
        content,
        createdAt: result.createdAt,
        author: {
          id: session.data?.user.id!,
          name: session.data?.user.name!,
          image: session.data?.user.image!
        }
      }, ...prev])
    }
    setIsSubmitting(false)
  }

  const handleDeleteComment = async (commentId: string) => {
    setDeletingId(commentId)
    try {
      await deleteComment(commentId)
      setCommentsList(prev => prev.filter(comment => comment.id !== commentId))
      toast.success('Comment deleted')
    } catch (error) {
      toast.error('Failed to delete comment')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        <CommentModal onCommentSubmit={onCommentSubmit}>
          <Button>Add Comment</Button>
        </CommentModal>
      </div>

      <div className="space-y-4">
        {commentsList.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </CardContent>
          </Card>
        ) : (
          commentsList.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={comment.author.image || ''} />
                    <AvatarFallback>{(comment.author.name ?? "").slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Link href={`members/${comment.author.id}`}>
                      <p className="font-medium">{comment.author.name}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                {(session.data?.user.id === comment.author.id ||
                  session.data?.user.role === 'ADMIN') && (
                    <DeleteButton
                      onDelete={() => handleDeleteComment(comment.id)}
                      isDeleting={deletingId === comment.id}
                    />
                  )}
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}