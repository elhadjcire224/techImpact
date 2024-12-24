'use client'

import IdeaCard from "@/components/ideas/ideas_card"
import { IdeaFilters } from "@/components/ideas/ideas_filters"
import { Button } from "@/components/ui/button"
import { useIdeasInfiniteScroll } from "@/hooks/use_infinite_ideas"
import { useTags } from "@/hooks/use_tags"
import Link from "next/link"
import { useState } from "react"
import { IdeaCardSkeleton } from "@/components/ideas/idea_card_skeleton"

export default function IdeasPage() {

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'discussed' | 'liked'>('recent');
  const [filterBy, setFilterBy] = useState<'all' | 'myideas'>('all');
  const { selectedTags, availableTags, toggleTag } = useTags()

  const {
    ideas,
    isLoading,
    loadMoreRef
  } = useIdeasInfiniteScroll(searchQuery, selectedTags, sortBy, filterBy);


  return (
    <div className="flex-1 space-y-4 px-0 pb- md:p-8 py-6 my-10 md:mt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ideas</h2>
        <Link href="/ideas/create"><Button>Create Idea</Button></Link>
      </div>
      <IdeaFilters
        selectedTags={selectedTags}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        availableTags={availableTags}
        toggleTag={toggleTag}
      />
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Show 6 skeleton cards while loading initial data
          Array.from({ length: 3 }).map((_, i) => (
            <IdeaCardSkeleton key={i} />
          ))
        ) : (
          ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))
        )}
      </div>

      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">

      </div>
    </div>
  )
}
