// components/ideas/filters.tsx

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag, useTags } from "@/hooks/use_tags"
import { fetchTags } from "@/lib/actions/tags.actions"
import { ListFilter, Search, Tags } from 'lucide-react'
import { useEffect, useState } from "react"

interface IdeaFiltersProps {
  selectedTags: Tag[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: 'recent' | 'discussed' | 'liked'
  setSortBy: (sort: 'recent' | 'discussed' | 'liked') => void
  filterBy: 'all' | 'myideas'
  setFilterBy: (filter: 'all' | 'myideas') => void
  availableTags: Tag[]
  toggleTag: (tagId: string) => void
}

export function IdeaFilters({
  selectedTags,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  toggleTag,
  availableTags
}: IdeaFiltersProps) {


  return (
    <div className="bg-background/95 backdrop-blur rounded-lg border p-4 space-y-4">
      {/* Header: Tabs + Create */}
      <div className="flex items-center justify-between md:justify-start md:gap-2">
        <Tabs
          defaultValue={filterBy}
          onValueChange={(value) => setFilterBy(value as 'all' | 'myideas')}
          className="w-auto"
        >
          <TabsList className="inline-flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="myideas">My Ideas</TabsTrigger>
          </TabsList>
        </Tabs>
        <Popover>
          <PopoverTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Tags className="h-4 w-4" />
              Tags
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="flex flex-wrap gap-1">
              {availableTags.map(tag => (
                <Badge
                  key={tag.id}
                  variant={selectedTags.some(t => t.id === tag.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2">
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as 'recent' | 'discussed' | 'liked')}
        >
          <SelectTrigger className="w-[110px] h-9">
            <ListFilter className="h-4 w-4" />
            <SelectValue placeholder="Recent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="discussed">Most Discussed</SelectItem>
            <SelectItem value="liked">Most Liked</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild className="hidden md:flex">
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Tags className="h-4 w-4" />
              Tags
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="flex flex-wrap gap-1">
              {availableTags.map(tag => (
                <Badge
                  key={tag.id}
                  variant={selectedTags.some(t => t.id === tag.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title..."
            className="pl-8 h-9 max-w-lg"
          />
        </div>
      </div>
    </div>
  )
}
