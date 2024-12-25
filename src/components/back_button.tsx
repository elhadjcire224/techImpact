'use client'
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export default function BacKButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="mb-6 mt-4 text-muted-foreground hover:text-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>

  )
}