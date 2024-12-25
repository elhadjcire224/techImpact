"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { deleteAccount, updateProfile } from "@/lib/actions/profile.actions"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { FileIcon, Loader2, TrashIcon } from "lucide-react"
import { toast } from "react-hot-toast"
import { AvatarUpload } from "../onboarding/avatar_upload"
import SkillsInput from "../skills_input"

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  github: z.string().url({ message: "Please enter a valid URL." }),
  portfolio: z.string().url({ message: "Please enter a valid URL." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  skills: z.array(z.string()).min(1, { message: "Select at least one skill." }),
})


interface ProfileFormProps {
  user: User & {
    skills: { skill: string }[]
  }
}


export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState<File>()
  const [cv, setCv] = useState<File>()
  const router = useRouter()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      github: user.github || "",
      portfolio: user.portfolio || "",
      phone: user.phone || "",
      bio: user.bio || "",
      skills: user.skills.map(s => s.skill),
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true)
    try {
      await updateProfile(values, avatar, cv)
      toast.success("Profile updated successfully")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteAccount() {
    try {
      await deleteAccount()
      router.push("/")
    } catch (error) {
      toast.error("Failed to delete account")
    }
  }

  const handleAvatarChange = async (file: File) => {
    setAvatar(file)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card rounded-xl shadow-lg border">
        {/* Profile Header */}
        <div className="relative h-32 bg-gradient-to-r from-primary/10 to-sky-400/10 rounded-t-xl">
          <div className="absolute -bottom-16 inset-x-0 flex justify-center">
            <AvatarUpload
              onImageChange={handleAvatarChange}
              initials={user.name?.split(' ').map(n => n[0]).join('') || 'U'}
              initialImage={user.image}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourportfolio.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Full width fields */}
          <div className="mt-6 space-y-6">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <SkillsInput
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your skills one by one. Press <kbd className="px-2 py-0.5 text-xs rounded-md bg-muted border">Enter</kbd> or <kbd className="px-2 py-0.5 text-xs rounded-md bg-muted border">comma</kbd> to add each skill.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CV Section with improved styling */}
            {user.cvPath ? (
              <div className="space-y-2">
                <FormLabel>Current CV</FormLabel>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={user.cvPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline bg-primary/5 px-4 py-2 rounded-lg"
                  >
                    <FileIcon className="w-4 h-4" />
                    View CV
                  </a>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={e => setCv(e.target.files?.[0])}
                    className="flex-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <FormLabel>Upload CV</FormLabel>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={e => setCv(e.target.files?.[0])}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t">
            <Button type="submit" className="sm:w-auto w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="sm:w-auto w-full">
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </form>
    </Form>
  )
}
