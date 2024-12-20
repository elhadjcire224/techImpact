"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton } from "../auth/signin_button";
import { ModeToggle } from "../toggle_theme_button";


export default function LandingHeader() {
  const pathname = usePathname();
  if (pathname !== "/") return
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-foreground border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
                <div className="h-4 w-4 rounded-full border-2 border-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">TechImpact</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <SignInButton />


          </div>
        </div>
      </div>
    </header>
  )
}