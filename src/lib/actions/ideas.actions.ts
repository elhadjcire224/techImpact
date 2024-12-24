// app/actions/idea.actions.ts
"use server"

import { auth } from "@/app/auth";
import prisma from "@/db/prisma"
import { IdeaStatus } from "@/types/ideas_types"
import { revalidatePath } from "next/cache";

interface FetchIdeasParams {
  page: number;
  searchQuery: string;
  selectedTags: string[];  // Maintenant ce sont les IDs des tags
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

}: FetchIdeasParams) {
  const ITEMS_PER_PAGE = 10;
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const userId = (await auth())?.user.id

  try {
    const ideas = await prisma.idea.findMany({
      where: {
        AND: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          selectedTags.length > 0
            ? {
              tags: {
                some: {
                  id: { in: selectedTags }
                }
              }
            }
            : {},
          filterBy === 'myideas' && userId ? { authorId: userId } : {},
        ],
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        tags: {
          select: {
            id: true,
            label: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        },
        likes: userId ? {
          where: {
            userId: userId
          },
          select: {
            userId: true
          }
        } : false
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
          selectedTags.length > 0
            ? {
              tags: {
                some: {
                  id: { in: selectedTags }
                }
              }
            }
            : {},
          filterBy === 'myideas' && userId ? { authorId: userId } : {},
        ],
      },
    });

    // Transformer les données pour le front
    const transformedIdeas = ideas.map(idea => ({
      ...idea,
      hasLiked: idea.likes ? idea.likes.length > 0 : false,
      likes: undefined // On ne renvoie pas la liste des likes
    }));

    const hasMore = skip + ideas.length < totalIdeas;
    // console.log(ideas[0].tags)

    return {
      ideas: transformedIdeas,
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
}: {
  title: string;
  description: string;
  tags: string[];
  authorId: string;
}) {

  const session = await auth()
  console.log('session server', session)

  if (!session) return
  try {
    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        tags: {
          connect: tags.map(tag => ({ id: tag }))
        },
        authorId: session.user.id,
        status: IdeaStatus.InDiscussion
      }
    });

    revalidatePath('/ideas');
    return idea;
  } catch (error) {
    console.error('Error creating idea:', error);
    throw error;
  }
}
