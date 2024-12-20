'use server'

import { Prisma } from "@prisma/client"
import prisma from "../prisma"
import { UserRole } from "@/types/user_roles"

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

export const getUserByEmailForJwt = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      role: true,
      onboardingCompleted: true
    }
  })

  return user
}

export const createUser = async (data: Partial<Prisma.UserCreateInput>) => {
  return await prisma.user.create({
    data: {
      email: data.email!,
      name: data.name,
      image: data.image,
      role: UserRole.USER,
      onboardingCompleted: false,
    }
  });
}

