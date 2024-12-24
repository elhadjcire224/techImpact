'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { completeOnboarding } from '@/lib/actions/onboarding.action'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types/user_roles'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, User, Users } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import SkillsInput from '../skills_input'
import { AvatarUpload } from './avatar_upload'



interface OnboardingFormProps {
  defaultValues: {
    name: string
    email: string
    image: string
  }
}


// Form Schema
const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  github: z.string().url({ message: "Please enter a valid GitHub URL" }).optional(),
  portfolio: z.string().url({ message: "Please enter a valid URL" }).optional(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  cv: z.instanceof(File, { message: "Please upload your CV" }).optional(),
  bio: z.string().min(20, { message: "Bio should be at least 50 characters" }).optional(),
  role: z.nativeEnum(UserRole, {
    required_error: "You need to select a role",
  }),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
})

export type onBoardingShemaType = z.infer<typeof formSchema>


// Main Onboarding Form Component
export default function OnboardingForm({ defaultValues }: OnboardingFormProps) {
  const [avatar, setAvatar] = useState<File>()
  const router = useRouter()

  const form = useForm<onBoardingShemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues.name,
      email: defaultValues.email,
    },
  })

  const onSubmit = async (values: onBoardingShemaType) => {
    const { cv, ...otherValues } = values
    const response = await completeOnboarding(otherValues, avatar!, cv)

    if (response.success) {
      toast.success(response.message)
      router.push('/dashboard')
      return
    }

    toast.error(response.message)
  }

  const handleAvatarChange = async (file: File) => {
    setAvatar(file)
  }

  return (
    <Card className="w-full  mx-auto overflow-hidden bg-card mt-12 md:max-w-4xl">
      <CardHeader className="text-center pb-10 pt-6 px-6 bg-primary/5">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
          Complete Your Profile
        </CardTitle>
      </CardHeader>

      <CardContent className='p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-center -mt-16 mb-8 relative z-10">
              <AvatarUpload
                onImageChange={handleAvatarChange}
                initials={defaultValues.name.split(' ').map(n => n[0]).join('')}
                initialImage={defaultValues.image}
              />
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel className="text-lg text-center block mb-6">Choose your path</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Developer Card */}
                      <Card
                        className={cn(
                          "relative overflow-hidden cursor-pointer group",
                          "transition-all duration-300 ease-in-out",
                          "hover:shadow-lg hover:scale-[1.02]",
                          "border-2",
                          field.value === UserRole.USER
                            ? "border-sky-400 bg-sky-400/5"
                            : "hover:border-sky-400/50"
                        )}
                        onClick={() => form.setValue('role', UserRole.USER)}
                      >
                        <CardContent className="flex flex-col items-center justify-center p-8">
                          <div className={cn(
                            "p-4 rounded-full mb-6",
                            "transition-colors duration-300",
                            field.value === UserRole.USER
                              ? "bg-sky-400/20"
                              : "bg-gray-100 group-hover:bg-sky-400/10"
                          )}>
                            <User className={cn(
                              "w-8 h-8",
                              field.value === UserRole.USER
                                ? "text-sky-400"
                                : "text-gray-500 group-hover:text-sky-400"
                            )} />
                          </div>
                          <CardTitle className={cn(
                            "text-xl mb-3 transition-colors",
                            field.value === UserRole.USER && "text-sky-400"
                          )}>
                            Developer
                          </CardTitle>
                          <p className="text-center text-sm text-muted-foreground">
                            Join projects and collaborate with others to create impact
                          </p>
                        </CardContent>
                      </Card>

                      {/* Mentor Card */}
                      <Card
                        className={cn(
                          "relative overflow-hidden cursor-pointer group ",
                          "transition-all duration-300 ease-in-out",
                          "hover:shadow-lg hover:scale-[1.02]",
                          "border-2",
                          field.value === UserRole.MENTOR
                            ? "border-sky-400 bg-sky-400/5"
                            : " hover:border-sky-400/50"
                        )}
                        onClick={() => form.setValue('role', UserRole.MENTOR)}
                      >
                        <CardContent className="flex flex-col items-center justify-center p-8">
                          <div className={cn(
                            "p-4 rounded-full mb-6",
                            "transition-colors duration-300",
                            field.value === UserRole.MENTOR
                              ? "bg-sky-400/20"
                              : "bg-gray-100 group-hover:bg-sky-400/10"
                          )}>
                            <Users className={cn(
                              "w-8 h-8",
                              field.value === UserRole.MENTOR
                                ? "text-sky-400"
                                : "text-gray-500 group-hover:text-sky-400"
                            )} />
                          </div>
                          <CardTitle className={cn(
                            "text-xl mb-3 transition-colors",
                            field.value === UserRole.MENTOR && "text-sky-400"
                          )}>
                            Mentor
                          </CardTitle>
                          <p className="text-center text-sm text-muted-foreground">
                            Guide and support other developers with your expertise
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel >Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Links */}
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Profile (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username"
                        {...field}
                      />
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
                    <FormLabel>Portfolio URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        required={false}
                        placeholder="https://your-portfolio.com"
                        {...field}
                      />
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
                    <FormLabel>Phone Number(Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+224 XXX XXX XXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CV Upload(Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) field.onChange(file)
                        }}

                      />
                    </FormControl>
                    <FormDescription>
                      Upload your CV (PDF, DOC, or DOCX)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skills */}
              <div className="md:col-span-2">
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
                        Enter your skills one by one. Press <strong className="text-blue-600">Enter</strong> or <strong className="text-blue-600">comma</strong> to add each skill.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : (
                'Complete Profile'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
