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
import { createIdea } from "@/lib/actions/ideas.actions"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { TagSelect } from "@/components/ui/tag_select"
import { useSession } from "next-auth/react"
import { ArrowLeft, Sparkles } from "lucide-react"
import BacKButton from "@/components/back_button"

const formSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters"),
    description: z.string().min(50, "Description must be at least 20 characters"),
    tags: z.array(z.string()).min(1, "Select at least one tag"),
})

export default function CreateIdeasPage() {
    const { availableTags } = useTags()
    const session = useSession()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            tags: [],
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createIdea(values)
            toast.success("Idea created successfully!")
            router.push("/ideas")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-8">
            <div className="container max-w-4xl mx-auto">
                <BacKButton />

                <Card className="border-none shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <CardHeader className="space-y-4 pb-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <h1 className="text-2xl font-bold tracking-tight">Create New Idea</h1>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Share your innovative idea with the community. Be specific and provide enough details for others to understand and contribute.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground">Title</FormLabel>
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
                                            <FormLabel className="text-foreground">Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your idea in detail. What problem does it solve? How can others help?"
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
                                            <FormLabel className="text-foreground">Tags</FormLabel>
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
                                        className="hover:bg-background/80"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                        className="min-w-[100px]"
                                    >
                                        {form.formState.isSubmitting ? "Creating..." : "Create Idea"}
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
