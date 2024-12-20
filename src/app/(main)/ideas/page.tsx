import { Button } from "@/components/ui/button"

export default function IdeasPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ideas</h2>
        <Button>Add New Idea</Button>
      </div>
      {/* Ideas content will go here */}
    </div>
  )
}

