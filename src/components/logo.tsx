import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
        <div className="h-4 w-4 rounded-full border-2 border-primary-foreground" />
      </div>
      <span className="text-xl font-semibold">TechImpact</span>
    </Link>
  )
}