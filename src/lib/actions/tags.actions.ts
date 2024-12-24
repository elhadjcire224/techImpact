"use server"

import prisma from "@/db/prisma"

export async function fetchTags() {
  try {
    return await prisma.tag.findMany({
      select: {
        id: true,
        label: true
      }
    })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}