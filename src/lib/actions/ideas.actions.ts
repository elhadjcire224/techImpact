"use server"

import prisma from "@/db/prisma";
import { IdeaStatus } from "@/types/ideas_types";
import { revalidatePath } from "next/cache";

interface FetchIdeasParams {
  page: number;
  searchQuery: string;
  selectedTags: string[];
  sortBy: 'recent' | 'discussed' | 'liked';
  filterBy: 'all' | 'myideas';
  userId?: string;
}

export async function fetchIdeas({
  page = 1,
  searchQuery = '',
  selectedTags = [],
  sortBy = 'recent',
  filterBy = 'all',
  userId
}: FetchIdeasParams) {
  const ITEMS_PER_PAGE = 15;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    const ideas = await prisma.idea.findMany({
      where: {
        AND: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          selectedTags.length > 0 ? { tags: { hasSome: selectedTags } } : {},
          filterBy === 'myideas' && userId ? { authorId: userId } : {},
        ],
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          }
        },
        _count: {
          select: { comments: true, likes: true }
        }
      },
      orderBy: {
        ...(sortBy === 'recent' ? { createdAt: 'desc' } : {}),
        ...(sortBy === 'discussed' ? { comments: { _count: 'desc' } } : {}),
        ...(sortBy === 'liked' ? { likes: { _count: 'desc' } } : {})
      },
      take: ITEMS_PER_PAGE,
      skip
    });

    const totalIdeas = await prisma.idea.count({
      where: {
        AND: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          selectedTags.length > 0 ? { tags: { hasSome: selectedTags } } : {},
          filterBy === 'myideas' && userId ? { authorId: userId } : {},
        ],
      },
    });

    const hasMore = skip + ideas.length < totalIdeas;

    return {
      ideas,
      hasMore,
      totalIdeas
    };
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
}

type CreateIdeaResult = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export async function createIdea({
  title,
  description,
  tags,
  authorId
}: {
  title: string;
  description: string;
  tags: string[];
  authorId: string;
}): Promise<CreateIdeaResult> {
  try {
    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        tags,
        authorId,
        status: IdeaStatus.InDiscussion
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            id: true
          }
        }
      }
    });

    revalidatePath('/ideas');
    return idea;
  } catch (error) {
    console.error('Error creating idea:', error);
    throw error;
  }
}
