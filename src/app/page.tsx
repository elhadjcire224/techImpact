import LandingHeader from '@/components/headers/landing_header'
import { Button } from '@/components/ui/button'
import { signInAction } from '@/lib/actions/auth.actions'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { auth } from './auth'

export default async function LandingPage() {
  const session = await auth()
  return (
    <div className=" flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="  space-y-6 pb-8 pt-28 md:pb-12 md:pt-36 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Drive Impact Through Technology
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Join our platform to create and share ideas that make a difference.
              Connect with like-minded innovators and turn your vision into reality.
            </p>
            {session?.user ?(<div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/ideas">Get Started</Link>
              </Button>
            </div>)
            :( <form action={signInAction}>
              <Button
                size="lg"

                className="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Get Started with Google <ArrowRight size={24} />
              </Button>
            </form>)
            }
          </div>
        </section>

        <section id="features" className="container space-y-6  py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to create and manage your tech impact projects.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {/* Feature cards would go here */}
          </div>
        </section>
      </main>
    </div>
  )
}
