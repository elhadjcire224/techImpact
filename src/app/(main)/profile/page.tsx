import { ProfileForm } from "@/components/profile/profile_form"
import prisma from "@/db/prisma"
import { auth } from "@/app/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { skills: true }
  })

  if (!user) redirect("/")

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="container max-w-4xl py-8 my-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
            Edit Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your profile and manage your account settings
          </p>
        </div>
        <ProfileForm user={user} />
      </div>
    </div>
  )
}