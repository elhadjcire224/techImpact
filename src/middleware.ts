import { auth } from "@/app/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!session.user?.onboardingCompleted) {
    return NextResponse.redirect(new URL("/onboarding", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ideas/:path*",
    "/members/:path*",
    "/profile/:path*",
  ]
}