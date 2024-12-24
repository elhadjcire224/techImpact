import { fetchIdeas } from "@/lib/actions/ideas.actions";
import { IdeaCard } from "@/types/ideas_types";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tag } from "./use_tags";




export function useIdeasInfiniteScroll(
  searchQuery: string,
  selectedTags: Tag[],
  sortBy: 'recent' | 'discussed' | 'liked',
  filterBy: 'all' | 'myideas'
) {
  const [ideas, setIdeas] = useState<IdeaCard[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const selectedTagsIds = selectedTags.map(tag => tag.id);
  const resetAndLoad = useCallback(async () => {
    setIsLoading(true);
    setPage(1);
    try {
      const result = await fetchIdeas({
        page: 1,
        searchQuery,
        selectedTags: selectedTagsIds,
        sortBy,
        filterBy,
      });

      setHasMore(result.hasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedTags, sortBy, filterBy]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const result = await fetchIdeas({
        page: page + 1,
        searchQuery,
        selectedTags: selectedTagsIds,
        sortBy,
        filterBy,
      });
      setIdeas(prev => [...prev, ...(result.ideas as IdeaCard[])]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading, searchQuery, selectedTags, sortBy, filterBy]);

  useEffect(() => {
    resetAndLoad();
  }, [resetAndLoad]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return {
    ideas,
    isLoading,
    hasMore,
    loadMoreRef: ref
  };
}
