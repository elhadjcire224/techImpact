import { toggleLike, addComment } from "./actions/ideas.actions"
import toast from "react-hot-toast"

export async function handleLike(ideaId: string) {
  try {
    await toggleLike(ideaId)
    return true
  } catch (error) {
    toast.error("Failed to update like")
    return false
  }
}

export async function handleShare(title: string, description: string, url: string) {
  if (!navigator.share) {
    await navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard!')
    return
  }

  try {
    await navigator.share({
      title,
      text: description,
      url
    })
  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      toast.error('Failed to share')
    }
  }
}

export async function handleCommentSubmit(ideaId: string, content: string) {
  try {
    const result = await addComment(ideaId, content)
    toast.success('Comment added successfully')
    return result
  } catch (error) {
    toast.error('Failed to add comment')
    return false
  }
}
