import { Button } from "../ui/button"
import { Heart, Share2 } from "lucide-react"
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
