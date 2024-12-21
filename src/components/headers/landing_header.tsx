"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton } from "../auth/signin_button";
import { ModeToggle } from "../toggle_theme_button";
import { Logo } from "../logo";
import { useSession } from "next-auth/react";
import UserAvatar from "../user_avatar";


export default function LandingHeader() {
  const { data } = useSession();
  const pathname = usePathname();
  if (!["/", "/onboarding"].includes(pathname)) return
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-foreground border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {data?.user ? <UserAvatar image={data?.user.image!} name={data?.user.image!} email={data.user.email!} /> : <SignInButton />}

          </div>
        </div>
      </div>
    </header>
  )
}