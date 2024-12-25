"use server"

import prisma from "@/db/prisma"
import { IdeaStatus } from "@/types/ideas_types"

export async function getDashboardAnalytics() {
  try {
    const [
      totalUsers,
      totalIdeas,
      totalMentors,
      inDiscussionIdeas,
      inProgressIdeas,
      completedIdeas
    ] = await Promise.all([
      prisma.user.count(),
      prisma.idea.count(),
      prisma.user.count({
        where: { role: 'MENTOR' }
      }),
      prisma.idea.count({
        where: { status: IdeaStatus.InDiscussion }
      }),
      prisma.idea.count({
        where: { status: IdeaStatus.InProgress }
      }),
      prisma.idea.count({
        where: { status: IdeaStatus.Completed }
      })
    ])

    return {
      totalUsers,
      totalIdeas,
      totalMentors,
      ideasByStatus: {
        inDiscussion: inDiscussionIdeas,
        inProgress: inProgressIdeas,
        completed: completedIdeas
      }
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    throw error
  }
}
