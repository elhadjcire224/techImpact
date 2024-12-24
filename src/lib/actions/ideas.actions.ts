// app/actions/idea.actions.ts
"use server"

import { auth } from "@/app/auth"
import prisma from "@/db/prisma"
import { IdeaStatus } from "@/types/ideas_types"
import { revalidatePath } from "next/cache"

interface FetchIdeasParams {
  page: number;
  searchQuery: string;
  selectedTags: string[];
  sortBy: 'recent' | 'discussed' | 'liked';
  filterBy: 'all' | 'myideas';
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
  const userId = (await auth())?.user.id;

  try {
    // Récupérer le total d'abord
    const totalIdeas = await prisma.idea.count({
      where: {
        AND: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          selectedTags.length > 0
            ? {
              tags: {
                some: {
                  tagId: { in: selectedTags }
                }
              }
            }
            : {},
          filterBy === 'myideas' && userId ? { authorId: userId } : {},
        ],
      },
    });

    // Si pas de résultats, retourner tôt
    if (totalIdeas === 0) {
      return {
        ideas: [],
        hasMore: false,
        totalIdeas: 0
      };
    }

    // Sinon récupérer les idées
    const ideas = await prisma.idea.findMany({
      where: {
        AND: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          selectedTags.length > 0
            ? {
              tags: {
                some: {
                  tagId: { in: selectedTags }
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
          include: {
            tag: true
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

    const transformedIdeas = ideas.map(idea => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      createdAt: idea.createdAt,
      updatedAt: idea.updatedAt,
      status: idea.status as IdeaStatus,
      mentorValidated: idea.mentorValidated,
      authorId: idea.authorId,
      author: {
        id: idea.author.id,
        name: idea.author.name,
        image: idea.author.image || '',
      },
      _count: {
        comments: idea._count.comments,
        likes: idea._count.likes
      },
      tags: idea.tags.map(t => ({
        id: t.tag.id,
        label: t.tag.label
      })),
      hasLiked: idea.likes ? idea.likes.length > 0 : false
    }));

    const hasMore = skip + ideas.length < totalIdeas;

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

export async function createIdea({
  title,
  description,
  tags,
}: {
  title: string;
  description: string;
  tags: string[];
}) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Not authenticated')
  }

  try {
    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        status: IdeaStatus.InDiscussion,
        authorId: session.user.id,
        tags: {
          create: tags.map(tagId => ({
            tag: {
              connect: { id: tagId }
            }
          }))
        }
      }
    });

    revalidatePath('/ideas');
  } catch (error) {
    console.error('Error creating idea:', error);
    throw error;
  }
}

export async function toggleLike(ideaId: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Not authenticated')
  }

  try {
    const existingLike = await prisma.ideaLike.findUnique({
      where: {
        userId_ideaId: {
          userId: session.user.id,
          ideaId: ideaId,
        },
      },
    })

    if (existingLike) {
      await prisma.ideaLike.delete({
        where: {
          userId_ideaId: {
            userId: session.user.id,
            ideaId: ideaId,
          },
        },
      })
      return { action: 'unliked' }
    } else {
      // Sinon on crée un nouveau like
      await prisma.ideaLike.create({
        data: {
          userId: session.user.id,
          ideaId: ideaId,
        },
      })
      return { action: 'liked' }
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    throw error
  }
}

export async function addComment(ideaId: string, commentText: string): Promise<void> {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Not authenticated')
  }

  try {
    await prisma.comment.create({
      data: {
        content: commentText,
        ideaId: ideaId,
        authorId: session.user.id,
      },
    });

    revalidatePath(`/ideas/${ideaId}`);
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}
export interface DetailedIdeaResponse {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: IdeaStatus;
  mentorValidated: boolean;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    image: string;
  };
  tags: {
    id: string;
    label: string;
  }[];
  comments: {
    id: string;
    content: string;
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }[];
  _count: {
    comments: number;
    likes: number;
  };
  hasLiked: boolean;
}
export async function fetchIdeaById(ideaId: string) {

  const userId = (await auth())?.user.id;

  try {
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                label: true
              }
            }
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
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
          }
        } : false
      }
    });

    if (!idea) {
      throw new Error('Idea not found');
    }

    return {
      ...idea,
      tags: idea.tags.map(t => ({
        id: t.tag.id,
        label: t.tag.label
      })),
      hasLiked: idea.likes ? idea.likes.length > 0 : false
    };

  } catch (error) {
    console.error('Error fetching idea:', error);
    throw error;
  }
}