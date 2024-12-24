'use client'
import { PropsWithChildren, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CommentModalProps {
  onCommentSubmit: (comment: string) => void
}

export function CommentModal({ children, onCommentSubmit }: PropsWithChildren<CommentModalProps>) {
  const [comment, setComment] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    if (comment.trim()) {
      onCommentSubmit(comment)
      setComment('')
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add a Comment</DialogTitle>
          <DialogDescription>
            Share your thoughts on this idea. Be constructive and respectful.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          className="min-h-[100px]"
        />
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Post Comment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

