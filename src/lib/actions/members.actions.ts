"use server"

import { auth } from "@/app/auth"
import prisma from "@/db/prisma"
import { UserRole } from "@/types/user_roles"
import { tree } from "next/dist/build/templates/app-page"

interface FetchMembersParams {
  searchQuery?: string
  role?: UserRole | 'all'
}

export async function fetchMembers({ searchQuery = '', role = 'all' }: FetchMembersParams) {
  try {
    const members = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: searchQuery, mode: 'insensitive' } },
              { email: { contains: searchQuery, mode: 'insensitive' } },
            ],
          },
          role !== 'all' ? { role: role as UserRole } : {},
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        bio: true,
        github: true,
        skills: true
      },
    })

    return members.map(member => ({
      ...member,
      skills: member.skills.map(s => s.skill) // Transform skills to strings
    }))
  } catch (error) {
    console.error('Error fetching members:', error)
    throw error
  }
}

export async function fetchMemberById(id: string) {

  try {
    return await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        bio: true,
        portfolio: true,
        skills: true,
        role: true,
        phone: true,
        github: true,
        cvPath: true,
      }
    })

  } catch (e) {
    console.log(e)
    throw e
  }
}

