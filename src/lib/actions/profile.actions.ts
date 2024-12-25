"use server"

import { auth } from "@/app/auth"
import prisma from "@/db/prisma"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

interface ProfileUpdateData {
  name: string
  github: string
  portfolio: string
  phone: string
  bio: string
  skills: string[]
}

async function deleteExistingFile(url: string | null) {
  if (!url || url.includes('googleusercontent.com')) return
  try {
    await del(url)
  } catch (error) {
    console.error('Error deleting existing file:', error)
  }
}

export async function updateProfile(
  values: ProfileUpdateData,
  avatar?: File,
  cv?: File,
) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  // Get current user data
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true, cvPath: true }
  })

  let avatarUrl: string | undefined
  let cvUrl: string | undefined

  try {
    // Handle avatar upload
    if (avatar) {
      // Delete existing avatar if it's not from Google
      if (currentUser?.image) {
        await deleteExistingFile(currentUser.image)
      }
      const avatarBlob = await put(`avatars/${avatar.name}`, avatar, {
        access: "public",
        addRandomSuffix: true,
      })
      avatarUrl = avatarBlob.url
    }

    // Handle CV upload
    if (cv) {
      // Delete existing CV
      if (currentUser?.cvPath) {
        await deleteExistingFile(currentUser.cvPath)
      }
      const cvBlob = await put(`cvs/${cv.name}`, cv, {
        access: "public",
        addRandomSuffix: true,
      })
      cvUrl = cvBlob.url
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: values.name,
        github: values.github,
        portfolio: values.portfolio,
        phone: values.phone,
        bio: values.bio,
        image: avatarUrl || undefined,
        cvPath: cvUrl || undefined,
        skills: {
          deleteMany: {},
          createMany: {
            data: values.skills.map((skill) => ({ skill })),
          },
        },
      },
    })

    revalidatePath("/profile")
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}

export async function deleteAccount() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  try {
    // Get user's files before deletion
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true, cvPath: true }
    })

    // Delete user's files from blob storage
    if (user?.image) await deleteExistingFile(user.image)
    if (user?.cvPath) await deleteExistingFile(user.cvPath)

    // Delete user account
    await prisma.user.delete({
      where: { id: session.user.id },
    })
  } catch (error) {
    console.error('Error deleting account:', error)
    throw error
  }
}
