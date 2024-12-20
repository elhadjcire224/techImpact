import { Header } from '@/components/headers/header'
import LandingHeader from '@/components/headers/landing_header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
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
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#learn-more">Learn More</Link>
              </Button>
            </div>
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
