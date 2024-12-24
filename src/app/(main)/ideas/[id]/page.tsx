import { fetchIdeaById, DetailedIdeaResponse } from '@/lib/actions/ideas.actions'
import { Suspense } from 'react'
import IdeaDetails from '@/components/ideas/idea_details'
import { CommentSection } from '@/components/ideas/comment_section'

export default async function IdeaDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const { comments, ...ideaDetails } = await fetchIdeaById(id) as DetailedIdeaResponse

  return (
    <div className="container my-10 mx-auto px-1 py-8 md:mt-0">
      <div className="max-w-3xl mx-auto">
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