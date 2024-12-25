import { fetchIdeaById, DetailedIdeaResponse } from '@/lib/actions/ideas.actions'
import { Suspense } from 'react'
import IdeaDetails from '@/components/ideas/idea_details'
import { CommentSection } from '@/components/ideas/comment_section'
import { notFound } from 'next/navigation'
import BacKButton from '@/components/back_button'

export default async function IdeaDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const result = await fetchIdeaById(id)
  if (result === false) return notFound()
  const { comments, ...ideaDetails } = result as DetailedIdeaResponse

  return (
    <div className="container my-10 mx-auto px-1 py-8 md:mt-0">
      <BacKButton />
      <div className="max-w-5xl mx-auto">
        <Suspense fallback={<div>Loading idea details...</div>}>
          <IdeaDetails idea={ideaDetails} />
        </Suspense>

        <div className="mt-8">
          <div className="space-y-4">
            <CommentSection comments={comments} ideaId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}