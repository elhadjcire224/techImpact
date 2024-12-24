import { fetchTags } from "@/lib/actions/tags.actions"
import { useState, useCallback, useEffect } from "react"

export type Tag = {
  id: string;
  label: string;
}
export function useTags() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [availableTags, setAvailableTags] = useState<Tag[]>([])

  const toggleTag = useCallback((tagId: string) => {
    setSelectedTags(prev =>
      prev.find(tag => tag.id === tagId)
        ? prev.filter(tag => tag.id !== tagId)
        : [...prev, { id: tagId, label: tagId }]
    )
  }, [])

  useEffect(() => {
    const loadTags = async () => {
      const tags = await fetchTags()
      setAvailableTags(tags)
    }
    loadTags()
  }, [])

  return {
    selectedTags,
    setSelectedTags,
    availableTags,
    toggleTag
  }
}