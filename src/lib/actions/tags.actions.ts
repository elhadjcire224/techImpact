"use server"

import prisma from "@/db/prisma"

export async function fetchTags() {
  try {
    const tags = await prisma.idea.findMany({
      select: {
        tags: true
      }
    })
    const uniqueTags = new Set(tags.flatMap(idea => idea.tags))

    return Array.from(uniqueTags).map(tag => ({
      id: tag,
      label: tag
    }))
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}