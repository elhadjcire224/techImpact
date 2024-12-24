import { Button } from "@/components/ui/button"
import { Edit, Heart, Share2, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function LikeButton({ liked, numberLikes, onClick }: { liked: boolean, numberLikes: number, onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center space-x-1/5"
      onClick={(e) => {
        e.stopPropagation();
        onClick()
      }}
    >
      <Heart className={cn("h-4 w-4", liked && "text-red-500 fill-red-500 ")} />
      <span className="text-sm">{numberLikes}</span>
    </Button>
  )
}

export function ShareButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center"
      onClick={(e) => {
        e.stopPropagation();
        onClick()
      }}
    >
      <Share2 className="h-4 w-4" />
    </Button>
  )
}

export function EditButton({ ideaId }: { ideaId: string }) {
  return (
    <Link href={`/ideas/${ideaId}/edit`}>
      <Button variant="ghost" size="icon">
        <Edit className="h-4 w-4" />
      </Button>
    </Link>
  )
}

export function DeleteButton({ onDelete, isDeleting }: { onDelete: () => Promise<void>, isDeleting: boolean }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your idea and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={onDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
