'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTags } from "@/hooks/use_tags"
import { fetchIdeaById, updateIdea } from "@/lib/actions/ideas.actions"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { TagSelect } from "@/components/ui/tag_select"
import { ArrowLeft, Edit } from "lucide-react"
import { useEffect, useState } from "react"

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 20 characters"),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
})

export default function EditIdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const { availableTags } = useTags()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // Fetch and prefill form
  useEffect(() => {
    async function loadIdea() {
      try {
        const id = (await params).id
        const { comments, tags, ...ideaDetails } = await fetchIdeaById(id)
        
        form.reset({
          title: ideaDetails.title,
          description: ideaDetails.description,
          tags: tags.map(tag => tag.id)
        })
      } catch (error) {
        toast.error("Failed to load idea")
        router.push("/ideas")
      } finally {
        setIsLoading(false)
      }
    }
    loadIdea()
  }, [params, form, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const id = (await params).id
      await updateIdea(id, values)
      toast.success("Idea updated successfully!")
      router.push(`/ideas/${id}`)
    } catch (error) {
      toast.error("Failed to update idea")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-8">
      <div className="container max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 mt-4 text-muted-foreground hover:text-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="border-none shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center gap-2">
              <Edit className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Edit Idea</h1>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a clear, descriptive title"
                          className="bg-background/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your idea in detail"
                          className="min-h-[200px] bg-background/50 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <TagSelect
                          selected={field.value}
                          options={availableTags}
                          onChange={field.onChange}
                          showLabels
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Updating..." : "Update Idea"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
